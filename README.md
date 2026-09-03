# Antigravity-Chinese-Localization

Antigravity 深度汉化补丁程序

[![GitHub release](https://img.shields.io/github/v/release/LAN-TINA-WS/Antigravity-Chinese-Localization)](https://github.com/LAN-TINA-WS/Antigravity-Chinese-Localization/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://github.com/LAN-TINA-WS/Antigravity-Chinese-Localization)
[![Package Size](https://img.shields.io/badge/ASAR%20Size-4.44%20MB%20(Official%20Standard)-success)](https://github.com/LAN-TINA-WS/Antigravity-Chinese-Localization)
[![Node Runtime](https://img.shields.io/badge/Node.js-%3E%3D%2014.0.0-informational)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

专为 Google Antigravity 打造的高性能、非破坏性深度汉化补丁。全面适配 Antigravity v2.12.0+ 最新架构，提供规划模式、全套系统设置、插件中心生态、多智能体协同等上千条界面的深度本地化支持，同时通过打包过滤规则彻底根治 asar 体积膨胀问题，保持官方原版 4.44MB 的轻量级运行规格。

> [最新 Release 下载](https://github.com/LAN-TINA-WS/Antigravity-Chinese-Localization/releases/latest) · [问题反馈与建议](https://github.com/LAN-TINA-WS/Antigravity-Chinese-Localization/issues) · [上游原项目](https://github.com/liominsb/Antigravity-Chinese-Localization)

---

## 核心特性矩阵

| 模块 | 能力与特性 | 详细说明 |
| :--- | :--- | :--- |
| 规划模式 (Planning Mode) | 全生命周期深度汉化 | 覆盖规划模式开关、实施计划 (Implementation Plan)、变更回顾 (Walkthrough)、需用户审批、待确认问题、拟定变更、自动化测试与人工验证等全套流程文案。 |
| 系统设置 (Settings) | 150+ 项设置面板全覆盖 | 汉化外观模式（浅色/深色/跟随系统）、对话区宽度（紧凑/适中/加宽/全宽）、防止休眠、后台运行、自动检查更新、命令执行审批策略（总是执行/审查/严格模式/极速模式）、数据存储与缓存维护。 |
| 安全与权限沙盒 (Sandbox) | 安全策略与黑白名单汉化 | 汉化终端沙盒模式、沙盒外命令执行确认规则、工作区外文件访问策略（允许/询问/拒绝）、网络访问策略、命令白名单/黑名单、浏览器访问域名白名单。 |
| 官方插件生态 (Plugins) | “使用 Google 插件构建”深度汉化 | 深度汉化插件中心全生命周期操作（安装/卸载/更新/启用/禁用）、包含构件标签（Skills/Rules/MCP/Hooks）、以及 Google 官方核心插件（gemini-api 等）的长句功能说明。 |
| 模型与推理呈现 | 100% 保持官方英文原生 | 遵循专业开发者习惯，模型选择下拉框（Gemini 3.8 / Claude 3.7 等）及思考状态（Thinking / Thought 过程）严格保留英文原文，不进行二次翻译干扰。 |
| 打包体积瘦身优化 | 4.44 MB 官方标准规格 | 修正打包过滤机制，使用 --unpack-dir 规范排除外部 Node 模块，彻底解决旧版重打包后 asar 膨胀至 21.4MB 的问题，体积与官方原版保持一致。 |
| 跨版本热升级机制 | 智能替换旧版补丁 | 摒弃原版因检测到旧标记而静默跳过的缺陷，改用 injectOrUpdate 截断更新机制，无论是全新安装还是跨版本更新，均可一键完成热升级。 |
| 渲染安全与输入免疫 | 编辑器与输入框免疫保护 | 穿透 Shadow DOM 实时监听，智能免疫 INPUT、TEXTAREA、富文本编辑区与 Monaco 代码编辑器，严禁篡改用户编写的代码和打字内容。 |
| 安全备份与一键还原 | 双向无损切换 | 首次部署时自动备份官方原版 app.asar.bak，支持随时通过面板或命令行一键安全还原至官方原版英文状态。 |

---

## 快速安装指南

### 方式一：Windows 用户（推荐）

#### 1. 图形化控制中心
1. 下载仓库源码或 Release 压缩包并解压；
2. 双击运行目录下的 **`双击运行汉化.bat`**；
3. 浏览器会自动打开控制中心（`http://localhost:3388`），点击“一键开始汉化”即可。

#### 2. 纯命令行极速部署（免开浏览器）
在终端中进入项目目录，执行以下命令即可在 5 秒内完成全自动替换：
```bash
node localize.js --now
```

---

### 方式二：Linux / Ubuntu 用户

1. 打开终端，进入项目目录，运行一键启动脚本：
   ```bash
   ./运行汉化.sh
   ```
2. 浏览器自动打开可视化控制面板，点击“一键开始汉化”。  
   或者直接通过无头命令部署：
   ```bash
   node localize.js --now
   ```

---

### 方式三：macOS 用户

1. 打开终端，进入项目目录，赋予执行权限并运行：
   ```bash
   chmod +x 运行汉化.sh
   ./运行汉化.sh
   ```
2. 浏览器自动打开控制中心，点击“一键开始汉化”。默认定位路径为 `/Applications/Antigravity.app`。

> **macOS 代码签名提示**：  
> 在 macOS 下修改应用内部 asar 包会破坏原有的签名信息，Gatekeeper 可能会拦截并提示“应用已损坏，无法打开”。若遇到该情况，在终端中执行以下命令清除隔离属性即可恢复正常：  
> ```bash
> xattr -cr /Applications/Antigravity.app
> ```

---

## 常用命令行参数

`localize.js` 支持直接通过参数进行静默操作，适合自动化脚本或开发者快速调用：

```bash
# 立即执行汉化并静默退出（不启动 Web 界面）
node localize.js --now

# 立即恢复到官方原版英文（使用 app.asar.bak 还原）
node localize.js --restore

# 仅解包 app.asar 到 extracted 目录（用于开发与分析）
node localize.js --extract-only

# 仅从 extracted 目录重新打包为 app.asar
node localize.js --pack-only
```

---

## 技术架构剖析

```text
[ Antigravity 启动 ]
        │
        ├─► [ 原生层: dist/loadingOverlay.js ] ──► 本地化启动遮罩动画
        ├─► [ 原生层: dist/menu.js & tray.js ] ──► 本地化菜单栏与系统托盘
        │
        └─► [ Web 容器: dist/preload.js ]
                    │
                    ▼
        [ DOM_TRANSLATOR_INJECTION 引擎 ]
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
 [ MutationObserver 监听 ]  [ Shadow DOM 穿透拦截 ]
        │                       │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────────────────┐
        ▼                                   ▼
 [ 免疫区域跳过 ]                      [ 词库与动态正则比对 ]
 • Monaco Editor 代码块               • 规划模式 / 实施计划
 • input / textarea / editable        • 系统设置与沙盒规则
 • 用户打字流不予干扰                 • 官方插件生态
                                      • 模型名 & Thinking 保持英文
```

### 1. 打包体积瘦身原理
官方 Antigravity 在 `resources/app.asar.unpacked/node_modules/` 中外置了部分重型依赖模块（例如 `chrome-devtools-mcp`）。旧版打包脚本未设置 unpack 过滤规则，导致打包工具将 17MB 的外置模块重复压缩打包回 `app.asar`，造成体积暴增至 21.4MB。  
本项目在重打包命令中精准引入了 `--unpack-dir "**/chrome-devtools-mcp/**"` 规则，确保外置模块保持独立解耦，将最终生成的 `app.asar` 完美恢复至官方标准的 **4.44 MB**。

### 2. 旧版补丁热升级机制
原脚本使用的 `appendOnce` 函数只判断文件末尾是否存在标记，导致已打过旧版补丁的用户在升级新版本时被判定为“已存在”而静默跳过新词库注入。  
本项目将其重构为 `injectOrUpdate` 机制：当检测到旧版注入签名时，自动定位并截断旧注入块，平滑替换为包含最新词库的完整代码，实现无缝覆盖升级。

---

## 常见问题与排错 (FAQ)

### Q1: 运行汉化后，启动应用提示找不到文件或报错？
请检查是否在 Antigravity 尚未完全关闭的情况下执行了打包。Antigravity 的 Go 语言后端进程（`language_server.exe`）可能在后台占用文件句柄。  
解决办法：在任务管理器中确保 `Antigravity.exe` 及相关进程已完全退出，然后重新运行 `node localize.js --now`。

### Q2: 官方推送新版本后，汉化失效了怎么办？
官方推送静默更新后会覆盖 `app.asar`。只需在更新完成后重新执行一次汉化命令：
```bash
node localize.js --now
```
脚本会自动备份新的官方 `app.asar` 并重新注入最新的深度汉化补丁。

### Q3: 如何完全卸载汉化、恢复原版？
在控制中心点击“恢复英文原版”，或者直接运行：
```bash
node localize.js --restore
```
程序将自动从此前备份的 `app.asar.bak` 中无损还原原始文件。

---

## 贡献者与开源协作

| 贡献者 | 角色与贡献 |
| :--- | :--- |
| [liominsb](https://github.com/liominsb) | 原项目创作者，搭建了最初的 Electron asar 注入与 Web 控制中心基础架构 |
| [LAN-TINA-WS](https://github.com/LAN-TINA-WS) | 2.12.0+ 深度汉化重构、4.44MB 瘦身修复、热更新机制设计、设置与插件生态词库扩充与独立维护 |

- **参与贡献**：欢迎提交 Pull Request 或通过 Issues 反馈未汉化的词条与界面。
- **上游 PR**：已向原作者仓库提交合并请求 [PR #17](https://github.com/liominsb/Antigravity-Chinese-Localization/pull/17)。

---

## 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 开源许可。你可以自由地分发、修改和在商业/非商业项目中使用本项目代码，但须保留原始版权声明与免责条款。
