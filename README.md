# Antigravity-Chinese-Localization

Antigravity 深度汉化与高性能本地化补丁程序

中文 | [English](README.en.md)

[![GitHub release](https://img.shields.io/github/v/release/liominsb/Antigravity-Chinese-Localization?style=flat&color=blue)](https://github.com/liominsb/Antigravity-Chinese-Localization/releases/latest)
[![GitHub downloads](https://img.shields.io/github/downloads/liominsb/Antigravity-Chinese-Localization/total?style=flat&color=success)](https://github.com/liominsb/Antigravity-Chinese-Localization/releases)
[![GitHub stars](https://img.shields.io/github/stars/liominsb/Antigravity-Chinese-Localization?style=flat&color=gold)](https://github.com/liominsb/Antigravity-Chinese-Localization/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/liominsb/Antigravity-Chinese-Localization?style=flat&color=orange)](https://github.com/liominsb/Antigravity-Chinese-Localization/issues)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)](https://github.com/liominsb/Antigravity-Chinese-Localization)
[![Package Size](https://img.shields.io/badge/ASAR%20Size-4.53%20MB%20(Official%20Standard)-success)](https://github.com/liominsb/Antigravity-Chinese-Localization)
[![Node Runtime](https://img.shields.io/badge/Node.js-%3E%3D%2014.0.0-informational)](https://nodejs.org/)
[![license](https://img.shields.io/github/license/liominsb/Antigravity-Chinese-Localization)](LICENSE)

专为 Google Antigravity 打造的高性能、非破坏性深度汉化补丁。全面适配 **Antigravity v2.12.0+** 最新架构，深度重构基础算力层与 DOM 调度层，带来百万级吞吐量的极致流畅体验。全量汉化规划模式、系统设置、权限沙盒、官方插件生态等上千条核心界面文案，严格遵循官方 4.53 MB 轻量级打包规格，并对用户打字与代码编辑区实施绝对物理免疫。

> [最新 Release 下载](https://github.com/liominsb/Antigravity-Chinese-Localization/releases/latest) · [问题反馈与建议](https://github.com/liominsb/Antigravity-Chinese-Localization/issues)

---

## 核心特性矩阵

| 模块 | 能力与特性 | 详细说明 |
| :--- | :--- | :--- |
| 规划模式 (Planning Mode) | 全生命周期深度汉化 | 覆盖规划模式开关、实施计划 (Implementation Plan)、变更回顾 (Walkthrough)、需用户审批、待确认问题、拟定变更、自动化测试与人工验证等全套流程文案。 |
| 系统设置 (Settings) | 150+ 项设置面板全覆盖 | 汉化外观模式（浅色/深色/跟随系统）、对话区宽度（紧凑/适中/加宽/全宽）、防止休眠、后台运行、自动检查更新、命令执行审批策略（总是执行/审查/严格模式/极速模式）、数据存储与缓存维护。 |
| 安全与权限沙盒 (Sandbox) | 安全策略与黑白名单汉化 | 汉化终端沙盒模式、沙盒外命令执行确认规则、工作区外文件访问策略（允许/询问/拒绝）、网络访问策略、命令白名单/黑名单、浏览器访问域名白名单。 |
| 官方插件生态 (Plugins) | “使用 Google 插件构建”深度汉化 | 深度汉化插件中心全生命周期操作（安装/卸载/更新/启用/禁用）、包含构件标签（Skills/Rules/MCP/Hooks）、以及 Google 官方核心插件（gemini-api 等）的长句功能说明。 |
| 模型与推理呈现 | 100% 保持官方英文原生 | 遵循专业开发者习惯，模型选择下拉框（Gemini 3.8 / Claude 3.7 等）及思考状态（Thinking / Thought 过程）严格保留英文原文，不进行二次翻译干扰。 |
| 极致算力与高帧率调度 | 吞吐量突破 168 万次/秒 | 预编译 $O(1)$ 哈希索引、纯中文 ASCII 极速短路、单次流式联合正则、DOM 树祖先剪枝与微任务调度，全面保障 60fps/120fps 满帧运行。 |
| 打包体积瘦身优化 | 4.53 MB 官方标准规格 | 修正打包过滤机制，使用 `--unpack-dir` 规范排除外部 Node 模块，彻底根除 asar 体积膨胀问题，体积与官方原版保持一致。 |
| 跨版本热升级机制 | 智能替换旧版补丁 | 摒弃原版因检测到旧标记而静默跳过的缺陷，改用 `injectOrUpdate` 截断更新机制，无论是全新安装还是跨版本更新，均可一键完成热升级。 |
| 渲染安全与输入免疫 | 编辑器与输入框免疫保护 | 穿透 Shadow DOM 实时监听，智能免疫 `INPUT`、`TEXTAREA`、富文本编辑区、Monaco 代码编辑器与用户对话气泡，严禁篡改用户编写的代码和输入内容。 |
| 安全备份与一键还原 | 双向无损切换 | 首次部署时自动备份官方原版 `app.asar.bak`，支持随时通过面板或命令行一键安全还原至官方原版纯英文状态。 |

---

## 快速安装指南

本补丁提供多种灵活的安装方式，满足普通用户与开发者的不同场景需求：

### 方式零：免环境即用覆盖（小白推荐，仅需 5 秒）

无需配置 Node.js 或任何运行环境，直接使用官方标准规格的预制核心包：

1. 前往 [Releases](https://github.com/liominsb/Antigravity-Chinese-Localization/releases/latest) 下载预打好包的 **`app.asar`**；
2. 彻底退出正在运行的 Antigravity；
3. 打开程序目录（Windows 默认位置）：  
   `%LOCALAPPDATA%\Programs\antigravity\resources\`
4. 将下载的 `app.asar` 直接覆盖同名文件，重新启动 Antigravity 即可完成汉化。

---

### 方式一：Windows 用户（脚本与控制中心）

#### 1. 图形化控制中心（推荐）
1. 下载 Release 发布的 `default.zip` 或仓库源码并解压；
2. 双击运行目录下的 **`双击运行汉化.bat`**；
3. 浏览器会自动打开可视化控制中心（`http://localhost:3388`），系统会自动检测路径并就绪，点击“一键汉化”即可。

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
2. 浏览器自动打开可视化控制面板，点击“一键汉化”。  
   或者直接通过无头命令行部署：
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
2. 浏览器自动打开控制中心，点击“一键汉化”。默认定位路径为 `/Applications/Antigravity.app`。

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

## 开发者文档与技术实现 (Architecture & Deep Engineering)

本项目并非单纯的文本查找替换，而是在 Electron 原生渲染管线与 React 虚拟 DOM 调度层之间构建的一套高韧性、高吞吐的工业级本地化引擎。

```text
[ Antigravity 启动 ]
        │
        ├─► [ 原生层: dist/loadingOverlay.js ] ──► 本地化启动遮罩动画
        ├─► [ 原生层: dist/menu.js & tray.js ] ──► 本地化原生菜单栏与系统托盘
        │
        └─► [ Web 容器: dist/preload.js ]
                    │
                    ▼
        [ DOM_TRANSLATOR_INJECTION 核心引擎 ]
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
  [ 算力层: 预编译哈希 ]   [ 调度层: 微任务与剪枝 ]
  • Map O(1) 极速索引     • 联合词边界流式正则 (CORE_WORDS_UNION_REGEX)
  • ASCII 纯中文极速短路   • DOM 树祖先剪枝 (消灭 O(N^2) 嵌套递归)
  • WeakSet 成功标记门禁   • queueMicrotask 高保真帧聚合调度
        │                       │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────────────────┐
        ▼                                   ▼
  [ 绝对物理免疫沙盒 ]                 [ 生命周期自愈与动态切片 ]
  • Monaco 代码编辑器物理隔离         • Ctrl + R 重载生命周期与占位节点保护
  • INPUT / TEXTAREA 用户打字免疫     • React 独立节点物理切片动态自愈拼合
  • 控制中心防密码管理器篡改装甲       • 前置长句正则与中英混排纠偏
```

### 1. 基础算力层架构重构
- **预编译 Map 哈希查询**：放弃传统的遍历全字典循环回退模式，在启动阶段将所有词条预编译为小写映射表，把单次字典查表降阶为标准的 $O(1)$ 哈希直达。
- **ASCII 极速短路机制**：在进入复杂分词前执行 `!/[a-zA-Z]/.test(text)` 短路检测，使 90% 以上已经汉化的中文文本、纯标点与数字节点在 0 运算开销下秒级退出。
- **基准测试性能数据**：在 50,000 次混合文本吞吐压测中，整体耗时从原版的 `1,982.59 ms` 骤降至 **`29.70 ms`**（耗时降低 **98.5%**），单次调用平均延迟压至 **0.59 微秒**，瞬时吞吐量达到 **168 万次/秒**。

### 2. DOM 调度层与高帧率满帧保障
- **单次流式联合正则扫描 (CORE_WORDS_UNION_REGEX)**：将 80 余个独立单正则合并编译为单一联合词边界正则 `\b(word1|word2|...)\b/gi`，文本仅需一次流式扫描即可通过回调完成查表替换，短语分词加速 **3.1 倍**。
- **DOM 树祖先包含剪枝 (Ancestor Pruning)**：当复杂组件批量挂载时，如果节点 `B` 的父级 `A` 已在待处理队列中，算法自动对 `B` 进行剪枝剔除，彻底根治嵌套组件扫描时的 $O(N^2)$ 递归放大，实际深搜节点数降低 80% 以上。
- **微任务高保真调度 (queueMicrotask)**：替代易受浏览器失焦、后台节流或刷新初始化影响的 `requestAnimationFrame`，在当前事件循环末期以微任务形式极速冲洗突变队列，兼具去重防抖与 0 延迟响应。

### 3. 生命周期自愈与动态切片拼合
- **`Ctrl + R` 重载生命周期闭环**：收敛 `translatedNodes` 缓存门禁，在骨架屏与占位符阶段绝不盲目打标，仅在节点真正汉化成功或为纯中文时才记录标记，并在 `characterData` 突变时自动解绑旧标记，彻底解决页面重载后汉化失效的问题。
- **React 动态切片自愈拼接**：针对 React JSX 将长句或百分比数值（如 `89.3% of the customization budget...`、插件说明在 `the Agent in` 处）物理拆分为两个独立兄弟 Text 节点的特征，建立切片级前置拦截规则，实现自然流畅的拼合输出。

### 4. 渲染安全与装甲防护
- **输入与代码编辑区物理豁免**：穿透 Shadow DOM，对 `INPUT`、`TEXTAREA`、富文本编辑区、Monaco Editor 及用户提问气泡实施多重严格豁免，绝对不篡改用户的任何输入与代码。
- **控制中心防密码管理器篡改**：前端采用诱饵输入框、`readonly` 焦点激活与 `new-password` 声明，杜绝第三方密码管理器（如 1Password、Bitwarden 等）将路径误填为账号密码。

### 5. 打包体积瘦身与热升级机制
- **4.53 MB 官方规格瘦身**：官方在 `app.asar.unpacked/` 中外置了重型依赖模块。本项目在重打包时严格引入 `--unpack-dir "**/chrome-devtools-mcp/**"` 规则，保持外置解耦，生成的 `app.asar` 体积严格维持在 **4.53 MB**。
- **`injectOrUpdate` 平滑升级机制**：摒弃单纯判断标记是否存在的旧逻辑，当检测到历史版本的注入标记时，自动定位并截断旧代码块，平滑覆盖为包含最新引擎与词典的完整代码。

---

## 常见问题与排错 (FAQ)

### Q1: 运行汉化后，启动应用提示找不到文件或报错？
请检查是否在 Antigravity 尚未完全关闭的情况下执行了打包。Antigravity 的 Go 语言后端进程（`language_server.exe`）可能在后台占用文件句柄。  
解决办法：在任务管理器中确保 `Antigravity.exe` 及相关进程已完全退出，然后重新运行 `node localize.js --now`。

### Q2: 官方推送新版本后，汉化失效了怎么办？
官方推送更新后会静默覆盖 `app.asar`。只需在更新完成后重新执行一次汉化命令即可：
```bash
node localize.js --now
```
脚本会自动备份新的官方 `app.asar` 并重新注入最新的深度汉化补丁。或者直接下载最新 Release 预制的 `app.asar` 进行覆盖。

### Q3: 如何完全卸载汉化、恢复官方原版？
在控制中心点击“还原英文原版”，或者直接运行：
```bash
node localize.js --restore
```
程序将自动从此前备份的 `app.asar.bak` 中无损还原原始文件。

---

## 贡献者与开源协作

| 贡献者 | 角色与主要贡献 |
| :--- | :--- |
| [liominsb](https://github.com/liominsb) | 原项目创作者，搭建了最初的 Electron asar 注入与 Web 控制中心基础架构 |
| [LAN-TINA-WS](https://github.com/LAN-TINA-WS) | 2.12.0+ 深度重构、基础算力层与 DOM 调度层飞跃优化（168万次/秒）、4.53MB 瘦身修复、热更新引擎、生命周期与切片自愈、全套设置与插件生态词库扩充与独立维护 |
| [Justin-Mai](https://github.com/Justin-Mai) | 2.0 汉化控制中心架构升级、多用户/自定义路径、心跳自愈与防劫持、代码预览与 Diff 防误翻译隔离机制 |

- **参与贡献**：欢迎提交 Pull Request 或通过 Issues 反馈未汉化的词条与界面。

---

## 开源许可

本项目采用 [MIT License](LICENSE) 许可协议。
