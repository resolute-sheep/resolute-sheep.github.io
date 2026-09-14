# 个人主页

纯静态个人网站：**中英双语**、**三套可切换配色主题**、零依赖、零构建。
双击 `index.html` 就能看，也可以直接扔到 GitHub Pages。

> **本站不含任何人像照片。** 首屏右侧是一张纯文字的信息卡，三套主题下样式各不相同。

```
website/
├── index.html              页面外壳（唯一需要打开的入口）
├── .nojekyll               告诉 GitHub Pages 不要跑 Jekyll
├── assets/
│   ├── css/
│   │   ├── base.css        结构、排版、组件（与配色无关）
│   │   └── themes.css      三套皮肤：academic / portfolio / terminal
│   ├── js/
│   │   ├── content.js      ★ 全部文案都在这里（中英各一份）
│   │   └── app.js          渲染 + 语言/主题切换 + 目录高亮
│   └── img/
│       └── favicon.svg     浏览器标签页图标（"杨"字芯片图案，非照片）
└── tools/                  辅助脚本，部署时可以整个删掉
    ├── render-check.js     在桩 DOM 里跑一遍渲染，检查有没有报错
    ├── asset-check.js      检查有没有引用了不存在的文件
    ├── css-check.py        CSS 花括号配平 + 变量一致性
    └── make_avatar.py      生成人像用的（当前未使用，见第 6 节）
```

---

## 1. 本地查看

**最简单**：直接双击 `index.html`。

**推荐**（本地服务器，行为和线上一致）：

```powershell
cd D:\yzy\files\website
python -m http.server 8080 --bind 127.0.0.1
```

然后打开 <http://127.0.0.1:8080>。

---

## 2. 怎么改内容

只改 **`assets/js/content.js`** 这一个文件就够了。里面每一句文案都是这种形式：

```js
name: { zh: '低噪声高输入阻抗生物电信号模拟前端',
        en: 'Low-Noise High-Input-Impedance Biopotential Analog Front End' },
```

* 想加项目 → 往 `projects.items` 数组里复制一份现有条目的结构，改文字。
* 想加荣誉 → 往 `awards.items` 里加 `{ year, name, org }`，加 `star: true` 会带 ★。
* 想改首屏右侧那张信息卡 → 改 `idcard.rows`。
* **指标个数随便加**：`metrics` 的列数由 `app.js` 的 `balancedCols()` 按个数自动算，
  最后一行不会只剩一个格子。改完可以跑 `node tools/render-check.js` 复核。
* 中英文都要写；实在懒得写英文，就两边填一样的中文也能正常显示。

改完刷新浏览器即可，不需要编译。

---

## 3. 三套主题

右上角切换，选择会记在浏览器里，刷新后保持。

| 主题 | 风格 | 首屏信息卡 |
|---|---|---|
| `academic` | 白底、衬线标题、左侧目录、信息密集 | 细边框信息框 |
| `portfolio` | 深色、大标题、渐变光晕、卡片悬浮 | 半透明玻璃卡 |
| `terminal` | 近黑、等宽字体、绿色强调、扫描线 | 带红绿灯的终端窗口 |

想调默认主题，改 `index.html` 里的 `<html data-theme="academic">`。
想改三套皮肤的颜色，改 `assets/css/themes.css` 里每套开头的 CSS 变量即可。

---

## 4. 让别人能直接输入网址打开

### 4.1 先搞清楚：为什么现在这个网址别人打不开

本地预览用的是 `http://127.0.0.1:8080`。`127.0.0.1` 是**每台电脑都指向自己**的
回环地址——别人输入这个地址，打开的是他们自己电脑上的 8080 端口，不是你的网站。

要给别人一个能直接输入的网址，必须把网站放到**公网**上。本站是纯静态的
（HTML + CSS + JS，无后端、无数据库），所以任何静态托管服务都能用。

### 4.2 最省事：一条命令部署到 GitHub Pages

**第一步**，去 <https://github.com/new> 建一个空仓库（**不要**勾选 Add a README）。

**第二步**，在本地跑：

```powershell
cd D:\yzy\files\website
.\tools\deploy-github.ps1 -User 你的GitHub用户名 -Repo 仓库名
```

脚本会自动初始化仓库、提交、设置远程地址并推送。首次推送会弹 GitHub 登录窗口，
点一下授权即可（GitHub 早就不支持用密码推送了）。

**第三步**（只需做一次），打开 `https://github.com/你的用户名/仓库名/settings/pages`：

| 选项 | 选什么 |
|---|---|
| Source | Deploy from a branch |
| Branch | `main` |
| 目录 | `/ (root)` |

点 Save，等 1–2 分钟，你的网址就是：

```
https://你的用户名.github.io/仓库名/
```

以后改了内容，重跑一次脚本就会更新（Pages 大概 1 分钟后生效）。

> **想省掉网址里的 `/仓库名/`**：把仓库名取成正好 `你的用户名.github.io`，
> 网址就变成 `https://你的用户名.github.io/`。
>
> 仓库里的 `.nojekyll` 别删——它保证 `assets/` 这类下划线/特殊目录名不被 Jekyll 吞掉。
> 本站所有引用都是**相对路径**（可用 `python tools/path-check.py` 复核），
> 所以放在根域名还是子目录都能正常工作。

### 4.3 国内访问问题（重要，请一定测）

GitHub Pages 在国内**经常很慢甚至打不开**（`github.io` 的域名解析容易被污染）。
你的网站多半是给国内老师看的，所以**部署完一定要实测**：

1. 用手机**关掉 WiFi、用流量**打开你的网址
2. 再随便找个不在你身边的同学帮你打开一次

如果打得开（哪怕慢），那就可以直接用，这是最省事的方案。

**如果打不开，按代价从低到高有三个选择：**

| 方案 | 代价 | 国内速度 | 说明 |
|---|---|---|---|
| **A. 换 Netlify / Cloudflare Pages** | 免费，拖拽上传 | 一般，仍可能慢 | 不用 git，把 `website` 文件夹拖到 <https://app.netlify.com/drop> 就有网址 |
| **B. 用学校提供的主页空间** | 免费 | **快** | 很多高校给学生提供个人主页空间（一般是 `xxx.edu.cn/~学号` 这种）。问一下学院教务或信息化中心，这是最优解 |
| **C. 买域名 + 国内云 + 备案** | 域名约 ¥30/年，备案要 1–3 周 | **很快** | 用阿里云 OSS / 腾讯云 COS 的静态网站托管。**注意：不备案的话，国内云的默认域名访问 HTML 会被强制下载而不是打开**，所以备案绕不过去 |

> 网上流传的「Cloudflare 优选 IP」做法能让 `pages.dev` 在国内快起来，
> 但 [Cloudflare 明确禁止这种操作](https://www.hexvork.com/posts/cfpages-cn-access)，
> 可能导致账号被封，不建议用。

**短期建议**：先用 GitHub Pages，发邮件时把网址和一份 PDF 简历一起附上——
就算老师那边网络不好，也不影响你的材料被看到。

---

## 5. 上线前请自己确认这几件事

1. **不要公开的隐私**：工作区里的成绩单 PDF 含身份证号，简历 PDF 含手机号，
   六级成绩单含准考证号——这些我都没有放进网站，网站上只留了学校邮箱。
2. **数据口径**：站内所有指标都写明了验证层级（前仿真 / 实测 / 核级参考），
   未达标的也如实标了 ✕。详见 `../网站内容核对说明.md`。
3. **分享封面（可选）**：`index.html` 里目前没有 `og:image`，
   链接分享到微信/QQ 时不会显示缩略图。想加的话，做一张 1200×630 的 PNG 放进
   `assets/img/`，再加一行 `<meta property="og:image" content="assets/img/og.png">`。

---

## 6. 想把照片加回来

之前生成的人像文件已经删掉了。如果之后想恢复，`tools/make_avatar.py` 还在：

```powershell
python tools/make_avatar.py
```

它会从 `C:\Users\ASUS\Downloads\杨卓毅.jpg` 重新生成三张图到 `assets/img/`：
白底 `portrait.jpg`、透明抠图 `avatar-cutout.webp`、头肩方形 `avatar-square.webp`。

然后在 `assets/js/app.js` 的 `renderHero()` 里，把 `<aside class="idcard">…</aside>`
换回 `<div class="hero__photo">` 那三个 `<img>`（`git log` 里能找到原始版本），
并在 `base.css` / `themes.css` 里恢复 `.hero__photo` 相关规则。

> 不想保留这个脚本的话，直接删掉 `tools/make_avatar.py` 即可，站点不依赖它。

---

## 7. 自检脚本（可选）

```powershell
cd D:\yzy\files\website
node tools/spy-check.js       # 目录高亮回归测试：模拟滚动，验证"看到哪节就高亮哪节"
node tools/render-check.js    # 中英各渲染一遍：标签配平、漏翻、指标格列数、目录项与版块是否一一对应
node tools/asset-check.js     # 检查有没有引用了不存在的文件
python tools/path-check.py    # 检查是否全为相对路径（子目录部署的前提）
python tools/css-check.py     # 检查 CSS 配平、变量、锚点偏移是否重复计算
```

全部退出码为 0 就没问题。`tools/` 目录在部署时可以不传（`deploy-github.ps1` 之外
的脚本都只服务于本地开发）。

---

## 8. 常见问题

**Q：改了内容，多久能生效？**
本地刷新浏览器立刻生效。部署到 GitHub Pages 后约 1 分钟生效；
如果没变，按 `Ctrl+F5` 强制刷新（浏览器缓存）。

**Q：`deploy-github.ps1` 报「无法加载文件，因为在此系统上禁止运行脚本」？**
PowerShell 默认禁止执行脚本，运行一次即可放开（只影响当前用户）：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Q：GitHub 上仓库建错了名字怎么办？**
改仓库名后重新跑脚本：`.\tools\deploy-github.ps1 -User 用户名 -Repo 新名字`，
脚本会把远程地址一起改掉。

**Q：想用自己买的域名？**
在 `assets/` 同级放一个 `CNAME` 文件，内容写你的域名（一行，比如 `yangzhuoyi.com`），
然后在域名服务商处把 DNS 指向 `你的用户名.github.io`。国内域名要解析到
GitHub 的话访问仍然慢，想快还是得走 4.3 的方案 C。

三个脚本都退出码为 0 就是没问题。`tools/` 目录在部署时可以不传。
