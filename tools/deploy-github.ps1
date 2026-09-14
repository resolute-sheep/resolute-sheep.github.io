<#
  一键部署到 GitHub Pages

  前提：先在 GitHub 上建一个空仓库（不要勾选 README）。
  用法：
      cd D:\yzy\files\website
      .\tools\deploy-github.ps1 -User 你的用户名 -Repo 仓库名

  可选参数：
      -UseSSH              用 git@github.com:... 而不是 https（需先配好 SSH 密钥）
      -RemoteUrl <地址>    完全自定义远程地址（Gitee、自建 git 等）

  首次推送会要求登录 GitHub。推荐用浏览器登录（弹出的窗口点一下即可），
  不要用密码——GitHub 已经不支持密码推送了。
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$User,
    [Parameter(Mandatory = $true)][string]$Repo,
    [string]$RemoteUrl,
    [switch]$UseSSH,
    [string]$Message = "Update personal homepage"
)

# 注意：这里**必须**是 Continue。
# git 会把错误和进度（包括 push 的 "Enumerating objects..."）写到 stderr，
# 而 PowerShell 5.1 会把原生命令的 stderr 包装成 NativeCommandError；
# 一旦 ErrorActionPreference = 'Stop'，脚本会在这些地方被直接中断，
# 连 2>$null 都挡不住。所以失败一律靠显式检查 $LASTEXITCODE 来判断。
$ErrorActionPreference = 'Continue'

function Info($m) { Write-Host "  $m" }
function Ok($m)   { Write-Host "  [OK] $m"   -ForegroundColor Green }
function Warn($m) { Write-Host "  [!]  $m"   -ForegroundColor Yellow }
function Die($m)  { Write-Host "  [X]  $m"   -ForegroundColor Red; exit 1 }

# 跑一条 git 命令：成功返回输出，失败返回 $null（不抛异常、不打印噪音）
function GitQuiet([string[]]$GitArgs) {
    $out = & git @GitArgs 2>$null
    if ($LASTEXITCODE -ne 0) { return $null }
    return $out
}

# ---------------------------------------------------------------- 环境检查
$site = Split-Path -Parent $PSScriptRoot
Set-Location $site

if (-not (Test-Path (Join-Path $site 'index.html'))) {
    Die "找不到 index.html，请确认脚本在 website\tools\ 目录下。"
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Die "没有找到 git。请先安装：https://git-scm.com/download/win"
}

# 仓库名正好是「用户名.github.io」时，GitHub 会把它当作个人主页站，
# 网址就是根域名，不再拼仓库名。
if ($Repo -ieq "$User.github.io") {
    $siteUrl = "https://$User.github.io/"
} else {
    $siteUrl = "https://$User.github.io/$Repo/"
}

Write-Host "`n仓库：$User/$Repo" -ForegroundColor Cyan
Write-Host "网址：$siteUrl`n" -ForegroundColor Cyan

# ------------------------------------------------------------ git 身份配置
# 提交署名会公开显示在 GitHub 的提交记录里，机器默认值（asus / user / admin…）
# 看着很不专业，所以这里主动拦一下。
$placeholders = @('asus', 'user', 'admin', 'administrator', 'pc', 'windows',
                  'root', 'name', 'your name', 'unknown', 'owner')

$name  = git config --global user.name
$email = git config --global user.email

if (-not $name) {
    $name = Read-Host "  请输入你的名字（会公开显示在提交记录里，建议用真名或拼音）"
    git config --global user.name $name
} elseif ($placeholders -contains $name.ToLower()) {
    Warn "git 提交署名现在是「$name」——系统默认值，会公开显示在你的 GitHub 提交记录里。"
    $new = Read-Host "  换成什么？（直接回车保留「$name」）"
    if ($new) { git config --global user.name $new; $name = $new }
}

if (-not $email) {
    $email = Read-Host "  请输入你的邮箱（建议用 GitHub 账号绑定的邮箱，提交才会关联到你的头像）"
    git config --global user.email $email
}

Ok "提交署名：$name <$email>"

# ---------------------------------------------------------------- 初始化
if (-not (Test-Path (Join-Path $site '.git'))) {
    git init | Out-Null
    Ok "已初始化 git 仓库"
}
# 统一分支名为 main。新仓库还没有提交时 git branch -M 可能失败，忽略即可。
GitQuiet @('branch', '-M', 'main') | Out-Null

# ------------------------------------------------------------------ 提交
git add -A
$staged = GitQuiet @('diff', '--cached', '--name-only')
if ($staged) {
    git commit -m $Message | Out-Null
    if ($LASTEXITCODE -ne 0) { Die "提交失败。请检查 git 身份配置（user.name / user.email）。" }
    Ok "已提交 $(($staged | Measure-Object).Count) 个文件的改动"
} else {
    Info "没有新改动需要提交"
}

# ------------------------------------------------------------ 远程仓库
if ($RemoteUrl) {
    $url = $RemoteUrl
} elseif ($UseSSH) {
    $url = "git@github.com:$User/$Repo.git"
} else {
    $url = "https://github.com/$User/$Repo.git"
}

# 用 git config --get 而不是 git remote get-url：没有 origin 时前者静默退出，
# 后者会往 stderr 写 "error: No such remote"，在 PS 5.1 下很难处理。
$existing = GitQuiet @('config', '--get', 'remote.origin.url')
if ($existing) {
    if ($existing.Trim() -ne $url) {
        git remote set-url origin $url
        Warn "远程地址已从 $existing 改为 $url"
    } else {
        Info "远程地址未变：$url"
    }
} else {
    git remote add origin $url
    if ($LASTEXITCODE -ne 0) { Die "添加远程仓库失败：$url" }
    Ok "已设置远程仓库 $url"
}

# ------------------------------------------------------------------ 推送
Write-Host "`n正在推送…（首次会弹出 GitHub 登录窗口）`n" -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Die @"
推送失败。常见原因：
    1. GitHub 上还没有建这个仓库   -> 去 github.com/new 建一个空的（不要勾 README）
    2. 仓库名或用户名写错了        -> 检查 -User / -Repo 参数
    3. 登录被取消                  -> 重新运行本脚本
"@
}

# ------------------------------------------------------------------ 收尾
Write-Host ""
Ok "推送成功"
Write-Host @"

  接下来只差一步（只需做一次）：
    打开 https://github.com/$User/$Repo/settings/pages
    Source 选  Deploy from a branch
    Branch 选  main      目录选  / (root)
    点 Save

  等 1-2 分钟，你的网址就是：
    $siteUrl

  以后改了内容，重新跑一次本脚本即可更新。

"@ -ForegroundColor Green
