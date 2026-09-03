# Antigravity 2.0 一键汉化补丁 (Chinese Localization Patch)

这是一个为 Antigravity 2.0 打造的全自动一键汉化补丁程序。

## ✨ 特性

- **全自动解包与重打包**：自动备份原始的 `app.asar` 文件，解压后注入汉化代码，再重新打包替换，全程无需手动干预。
- **全平台自适应支持**：完美支持 Windows、macOS 与 Ubuntu/Linux 操作系统，自动识别进程名、路径配置与程序类型。
- **动态 DOM 拦截汉化**：利用高级的 `MutationObserver` 与 Shadow DOM 穿透技术，实时拦截并翻译 Web 界面中的英文文本和属性（如 `placeholder`、`title`、`aria-label` 等）。
- **原生 UI 汉化**：支持对 Electron 原生菜单栏（Menu）和系统托盘（Tray）进行深度翻译。
- **超大且精准的词库**：内置数百个针对 IDE、智能体（Agent）配置、权限设置、快捷键以及工作区的精准翻译短语，避免机器翻译产生的“中英夹杂”现象。
- **安全备份与一键恢复**：每次汉化前都会自动备份 `app.asar.bak`，支持一键恢复到原版英文状态。

## 🚀 使用方法

### Windows 用户

1. 直接双击运行目录下的 **`双击运行汉化.bat`**。
2. 脚本会自动启动 Node.js 本地服务并在默认浏览器中打开可视化的控制中心（`http://localhost:3388`）。
3. 在控制面板中点击“一键开始汉化”即可。

### Linux / Ubuntu 用户

1. 打开终端，直接运行目录下的 **`运行汉化.sh`** 脚本：
   ```bash
   ./运行汉化.sh
   ```
2. 脚本会自动启动服务并在默认浏览器中打开可视化的控制中心。
3. 在控制面板中点击“一键开始汉化”即可。

### macOS 用户

1. 打开终端，进入脚本所在目录后运行 **`运行汉化.sh`** 脚本（需先赋予执行权限）：
   ```bash
   chmod +x 运行汉化.sh
   ./运行汉化.sh
   ```
2. 脚本会自动启动服务并在默认浏览器中打开可视化的控制中心。
3. 在控制面板中点击“一键开始汉化”即可。默认会定位到 `/Applications/Antigravity.app`。

## 🛠️ 技术细节

本工具通过 `node` 脚本和 `asar`/`@electron/asar` 库实现解包，向 `dist/preload.js`、`dist/ideInstall/wizardPreload.js` 等核心预加载文件中注入一段特制的 `DOM_TRANSLATOR_INJECTION` 引擎。
该引擎不仅重写了原生的 `attachShadow` 方法以捕获组件（如 Monaco Editor 等）的内部文本，还监听了完整的 DOM 树和属性更新，能够在几乎无性能损耗的情况下实现页面的即时语言转换。同时还在 `menu.js` 和 `tray.js` 中注入了原生的映射逻辑以翻译系统级 UI。

## ⚠️ 注意事项

- 请确保你的系统中已安装了 [Node.js](https://nodejs.org/)。
- 汉化过程中会强制关闭 Antigravity 及其语言服务器，请提前保存您的工作内容。
- 如果遇到界面异常或想要升级 Antigravity，可以通过图形化面板，或手动恢复备份：
  - *Windows*: 将 `%APPDATA%\Local\Programs\antigravity\resources\app.asar.bak` 恢复为 `app.asar`
  - *Linux*: 将 `~/Antigravity/Antigravity-x64/resources/app.asar.bak` 恢复为 `app.asar`
  - *macOS*: 将 `/Applications/Antigravity.app/Contents/Resources/app.asar.bak` 恢复为 `app.asar`
- **macOS 代码签名提示**：在 macOS 上修改 `.app` 包内部内容会破坏代码签名，Gatekeeper 可能弹出“应用已损坏，无法打开”的警告。这属于 Electron 汉化的固有特性（Windows 改 asar 同样破坏签名，只是 Windows 不拦截）。若遇到此提示，在终端执行以下命令清除隔离属性即可正常启动：
  ```bash
  xattr -cr /Applications/Antigravity.app
  ```

## 🎁 2.0 汉化控制中心更新说明

控制中心已升级至 2.0 跨平台自适应架构，实装了以下核心优化与修复（保持极简、防篡改、排版规整）：

- 🐧 **Linux/Ubuntu 与低版本 Node 运行时兼容**：新增一键 shell 脚本；适配 `pkill`/`pgrep` 命令；针对 v12.x 等老旧 Node 引擎自动退化 `fs.rmSync`，并动态调用 `asar@3.2.0` 打包以防止语法报错崩溃。
- 🛠️ **多用户与自定义路径支持**：支持输入任意 Windows/Linux 用户名或配置完全自定义路径（`APP_DIR`），带偏好自动缓存（`localStorage`）。
- 🎛️ **解耦手动检测与前置拦截**：新增「立即检测路径」按钮。当未配置过账户名时，指示灯会友好拦截并提示“等待输入”，解除打字过程中状态灯红绿闪烁的冲突。
- 🟢 **进程状态指示灯逻辑规范**：以最安全易部署的「已关闭 (就绪)」为绿色 🟢 亮灯，将存在文件锁冲突的「运行中 (占锁)」标记为黄色 🟡，完全切合部署直觉。
- 📡 **断线心跳感知与秒级自愈**：引入 2.5s 隐形心跳监测。当本地汉化服务突然被关闭时，指示灯秒级自动预警变红提示“未连接服务”；重新开启服务时免手动，秒级自愈恢复。
- 🛡️ **防密码管理器自动填充劫持**：部署隐藏雷达诱饵输入框、Focus 激活/Blur 锁死的只读保护盾（Readonly Armor），彻底拦截 Chrome 或第三方密码管理器在失焦、移出时强行篡改用户配置路径的行为。
- ⌨️ **输入与编辑区域免疫保护**：高精度检测并跳过 `INPUT`、`TEXTAREA`、富文本编辑区（`contenteditable="true"`）以及 `Monaco` 代码编辑框中的文本节点，绝对禁止翻译篡改用户正在打字的任何英文字符。
- 🔠 **品牌纯净化与中文字词空格消灭**：
  - 底层字典彻底剥离中文“汉化版”后缀，保留品牌高端英文原名本身的纯粹呈现（`Antigravity`、`Antigravity 2.0`），并前置拦截中文节点，杜绝多次翻译造成的单词重叠。
  - 引入 Unicode 空格清洗正则，自动清除分词翻译可能残留在中文字词之间的多余英文空格（如将 `历史 对话` 自动洗练为 `历史对话`）。
  - 精准修复了智能体工作日志汉化失效的 Bug。
- 📋 **部署控制台增量比对渲染**：引入 JSON 日志比对哈希。无新内容产生时彻底锁定 DOM，解决滚动条滑块频繁销毁重绘导致的无端抖动闪烁，仅在有新打包进度时按需对焦滚动。

## 🚀 2.12.0+ 深度汉化更新说明 (2026年9月最新版)

针对 Antigravity 从 2.2.1 升级至 **2.12.0** 经过 10 个小版本迭代带来的重大架构变化，实装了全方位的专业汉化升级与体积瘦身优化：

- 🧠 **全新规划模式 (Planning Mode) 全面汉化**：完整支持规划阶段各类界面、流程提示与按钮（如“规划模式已开启/关闭”、“实施计划”、“变更回顾”、“需用户审批”、“待确认问题”、“自动化测试”、“手动验证”、“继续执行”等）。
- ⚡ **深度推理与模型体系汉化**：覆盖最新推理深度控制（`Reasoning Effort` / `High/Low/Auto`）、思考预算（`Thinking Budget`）、内部推理与思考过程展示，以及 Gemini 3.8 Flash (High/Low) / Claude 3.7 Sonnet (Thinking) 等全新模型名。
- 🤝 **多智能体协作与团队系统 (Teamwork & Subagents)**：深度汉化子智能体生命周期全状态（`Waiting for input` / `Waiting for dependents` / `Waiting for message` / `Canceling` / `Errored` 等），以及代码库调研员、调研智能体、分支/共享/继承工作区模式等。
- 🔧 **MCP 工具体系与沙盒权限系统**：汉化 MCP 服务器配置、连接器、参数检查、终端沙盒外命令规则、网络访问规则与白名单等安全设置。
- 📦 **打包体积暴降瘦身修复 (~4.5MB 规范体积)**：修复旧版解包重打包时未规范隔离外部 Node 模块，导致 `app.asar` 从原本 4.5MB 暴增膨胀到 21.4MB 的缺陷。全新引入 `--unpack "{**/node_modules/chrome-devtools-mcp/**,**/*.node}"` 规则，还原官方标准架构，保障 MCP 外部进程高效运行。
- 🎨 **原生启动动画遮罩汉化**：将应用启动阶段加载遮罩 `dist/loadingOverlay.js` 中的英文文本原生本地化为“正在加载 Antigravity...”。


