<#
  一键部署到 GitHub Pages

  前提：先在 GitHub 上建一个空仓库（不要勾选 README）。
  用法：
      cd D:\yzy\files\website
      .\tools\deploy-github.ps1 -User 你的用户名 -Repo 仓库名

  首次推送会要求登录 GitHub。推荐用浏览器登录（弹出的窗口点一下即可），
  不要用密码——GitHub 已经不支持密码推送了。
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$User,
    [Parameter(Mandatory = $true)][string]$Repo,
    [string]$Message = "Update personal homepage"
)

$ErrorActionPreference = 'Stop'

function Info($m) { Write-Host "  $m" }
function Ok($m)   { Write-Host "  [OK] $m"   -ForegroundColor Green }
function Warn($m) { Write-Host "  [!]  $m"   -ForegroundColor Yellow }
function Die($m)  { Write-Host "  [X]  $m"   -ForegroundColor Red; exit 1 }

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
    git branch -M main
    Ok "已初始化 git 仓库"
} else {
    git branch -M main 2>$null | Out-Null
    Info "已存在的 git 仓库，继续使用"
}

# ------------------------------------------------------------------ 提交
git add -A
$staged = git diff --cached --name-only
if ($staged) {
    git commit -m $Message | Out-Null
    Ok "已提交 $((($staged | Measure-Object).Count)) 个文件的改动"
} else {
    Info "没有新改动需要提交"
}

# ------------------------------------------------------------ 远程仓库
$url = "https://github.com/$User/$Repo.git"
$existing = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0 -and $existing) {
    if ($existing -ne $url) {
        git remote set-url origin $url
        Warn "远程地址已从 $existing 改为 $url"
    }
} else {
    git remote add origin $url
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
