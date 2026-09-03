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

## 2.12.0+ 深度汉化更新说明

- 规划模式 (Planning Mode) 全流程界面汉化；
- 全套系统设置面板（外观/沙盒/执行策略/权限规则）深度覆盖；
- 官方插件中心与“使用 Google 插件构建”生态深度汉化；
- 模型选择与思考过程 (Thinking/Thought) 严格保持英文原生；
- 优化打包参数，修复 asar 体积膨胀缺陷，恢复至官方 4.44MB 规格；
- 注入引擎改造为 injectOrUpdate，支持旧补丁环境一键热升级。
