"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Preload script — runs in every BrowserWindow before the page loads.
 * Exposes a minimal, secure API via contextBridge so the renderer can
 * communicate with the main-process auto-updater without nodeIntegration.
 */
const electron_1 = require("electron");
const updaterAPI = {
    onStateChanged: (callback) => {
        const handler = (_event, state) => {
            callback(state);
        };
        electron_1.ipcRenderer.on('updater:state-changed', handler);
        // Return unsubscribe function
        return () => {
            electron_1.ipcRenderer.removeListener('updater:state-changed', handler);
        };
    },
    applyUpdate: () => electron_1.ipcRenderer.invoke('updater:apply'),
    quitAndInstall: () => electron_1.ipcRenderer.invoke('updater:quit-and-install'),
    checkForUpdates: () => electron_1.ipcRenderer.invoke('updater:check-for-updates'),
    getState: () => electron_1.ipcRenderer.invoke('updater:get-state'),
};
const dialogAPI = {
    showOpenDialog: () => electron_1.ipcRenderer.invoke('dialog:open-workspace'),
    showOpenMultipleFolderDialog: () => electron_1.ipcRenderer.invoke('dialog:open-workspaces'),
};
const notificationAPI = {
    send: (options) => electron_1.ipcRenderer.invoke('notification:send', options),
    openSystemPreferences: () => electron_1.ipcRenderer.invoke('notification:open-system-preferences'),
    onClicked: (callback) => {
        const handler = (_event, payload) => {
            callback(payload);
        };
        electron_1.ipcRenderer.on('notification:clicked', handler);
        return () => {
            electron_1.ipcRenderer.removeListener('notification:clicked', handler);
        };
    },
};
const storageAPI = {
    getItems: () => electron_1.ipcRenderer.invoke('storage:get-items'),
    updateItems: (changes) => electron_1.ipcRenderer.invoke('storage:update-items', changes),
    onChanged: (callback) => {
        const handler = (_event, changes) => {
            callback(changes);
        };
        electron_1.ipcRenderer.on('storage:changed', handler);
        return () => {
            electron_1.ipcRenderer.removeListener('storage:changed', handler);
        };
    },
};
const logsAPI = {
    getElectronLogs: () => electron_1.ipcRenderer.invoke('logs:electron'),
};
const extensionsAPI = {
    sendAuthorities: (authoritiesMap) => electron_1.ipcRenderer.invoke('extensions:send-authorities', authoritiesMap),
};
const deepLinkAPI = {
    onDeepLink: (callback) => {
        const handler = (_event, url) => {
            callback(url);
        };
        electron_1.ipcRenderer.on('deep-link', handler);
        return () => {
            electron_1.ipcRenderer.removeListener('deep-link', handler);
        };
    },
    getStoredDeepLink: () => electron_1.ipcRenderer.invoke('deep-link:get-stored'),
};
const agentAPI = {
    updateActiveAgentCount: (count) => electron_1.ipcRenderer.invoke('agent:update-active-count', count),
};
const electronNativeAPI = {
    getZoomLevel: () => electron_1.webFrame.getZoomFactor(),
    setTitleBarOverlay: (options) => electron_1.ipcRenderer.invoke('window:set-title-bar-overlay', options),
    minimize: () => electron_1.ipcRenderer.invoke('window:minimize'),
    maximize: () => electron_1.ipcRenderer.invoke('window:maximize'),
    unmaximize: () => electron_1.ipcRenderer.invoke('window:unmaximize'),
    isMaximized: () => electron_1.ipcRenderer.invoke('window:is-maximized'),
    close: () => electron_1.ipcRenderer.invoke('window:close'),
    toggleDevTools: () => electron_1.ipcRenderer.invoke('window:toggle-devtools'),
    zoomIn: () => {
        void electron_1.ipcRenderer.invoke('window:zoom-in');
    },
    zoomOut: () => {
        void electron_1.ipcRenderer.invoke('window:zoom-out');
    },
    resetZoom: () => {
        void electron_1.ipcRenderer.invoke('window:reset-zoom');
    },
    openExternal: (url) => electron_1.ipcRenderer.invoke('shell:open-external', url),
    revealInFilePicker: (path) => electron_1.ipcRenderer.invoke('shell:reveal-in-file-picker', path),
};
const ideAPI = {
    isInstalled: () => electron_1.ipcRenderer.invoke('ide:is-installed'),
};
electron_1.contextBridge.exposeInMainWorld('electronUpdater', updaterAPI);
electron_1.contextBridge.exposeInMainWorld('dialog', dialogAPI);
electron_1.contextBridge.exposeInMainWorld('nativeNotifications', notificationAPI);
electron_1.contextBridge.exposeInMainWorld('nativeStorage', storageAPI);
electron_1.contextBridge.exposeInMainWorld('logs', logsAPI);
electron_1.contextBridge.exposeInMainWorld('extensions', extensionsAPI);
electron_1.contextBridge.exposeInMainWorld('deepLink', deepLinkAPI);
electron_1.contextBridge.exposeInMainWorld('agent', agentAPI);
electron_1.contextBridge.exposeInMainWorld('electronNative', electronNativeAPI);
electron_1.contextBridge.exposeInMainWorld('ide', ideAPI);


// Antigravity 2.0 Chinese Localization Engine Enhanced
(function() {
  const dictionary = {
    // Top Bar & Menus
    "File": "文件",
    "Edit": "编辑",
    "View": "视图",
    "Selection": "选择",
    "Find": "查找",
    "Help": "帮助",
    "Docs": "文档",
    "Docs & API Reference": "文档与 API 参考",
    "Toggle Developer Tools": "开发者工具",
    "New Window": "新窗口",
    "Quit": "退出",
    "Cancel": "取消",
    "Confirm Quit": "确认退出",
    "Are you sure you want to quit?": "您确定要退出吗？",
    "There may be agents or background tasks running.": "可能还有智能体或后台任务正在运行。",
    "Welcome to the new Antigravity!": "欢迎使用全新 Antigravity！",
    "Antigravity has been redesigned to put agents first with new capabilities. If you'd still like a code editor, you can download it as a separate app named": "Antigravity 已经重构为以智能体为核心的全新平台。如果您仍需要代码编辑器，可以将其作为名为以下的独立应用下载：",
    "Antigravity IDE": "Antigravity IDE 编辑器",
    "Download the Antigravity IDE": "下载 Antigravity IDE",
    "Explore the new Antigravity": "探索全新 Antigravity",
    "Setting up…": "正在启动/设置中...",
    "Agent": "智能体",
    "Agents": "智能体",
    "Subagent": "子智能体",
    "Subagents": "子智能体",
    "Task": "任务",
    "Tasks": "任务",
    "Workspace": "工作区",
    "Workspaces": "工作区",
    "Command": "命令",
    "Run": "运行",
    "Settings": "设置",
    "Model": "模型",
    "Stop": "停止",
    "Approve": "批准",
    "Reject": "拒绝",
    "Terminal": "终端",
    "Output": "输出",
    "Codebase": "代码库",
    "Error": "错误",
    "Success": "成功",
    "Pending": "等待中",
    "Running": "运行中",
    "Completed": "已完成",
    "Failed": "已失败",
    "Branch": "分支",
    "Merge": "合并",
    "Conflict": "冲突",
    "Generate Image": "生成图像",
    "Web Search": "网页搜索",
    "Grep Search": "全局搜索",
    "Active Agents": "活跃智能体",
    "No agents running": "没有运行中的智能体",
    "active workspace": "活动工作区",
    "Active Workspace": "活动工作区",
    "Search": "搜索",
    "Search...": "搜索...",
    "Type a command...": "输入命令...",
    "Settings & Preferences": "设置与偏好",
    "General": "通用",
    "Themes": "主题",
    "Language": "语言",
    "Model Selection": "模型选择",
    "Advanced": "高级",
    "Developer": "开发者",
    "Save": "保存",
    "Close": "关闭",
    "Status": "状态",
    "Progress": "进度",
    "Logs": "日志",
    "Console": "控制台",
    "Running task...": "任务运行中...",
    "Task completed successfully": "任务成功完成",
    "An error occurred": "发生错误",
    "Connecting to Language Server...": "正在连接语言服务器...",
    "Language Server": "语言服务器",
    "Connected": "已连接",
    "Disconnected": "已断开",
    "Select a folder": "选择文件夹",
    "Open Folder": "打开文件夹",
    "Create New Project": "创建新项目",
    "Antigravity": "Antigravity",
    "Antigravity 2.0": "Antigravity 2.0",
    "Google DeepMind": "谷歌 DeepMind",
    "Advanced Agentic Coding": "高级智能体编码",
    "Welcome to Antigravity": "欢迎使用 Antigravity",
    "Get Started": "开始使用",
    "Create an agent to get started": "创建一个智能体以开始",
    "New Agent": "新建智能体",
    "Agent Name": "智能体名称",
    "System Prompt": "系统提示词",
    "Description": "描述",
    "Capabilities": "能力",
    "Write Files": "写入文件",
    "Run Commands": "运行命令",
    "Web Browsing": "网页浏览",
    "Define Subagents": "定义子智能体",
    "Call MCP Tools": "调用 MCP 工具",
    "Inherit Workspace": "继承工作区",
    "Branch Workspace": "分支隔离工作区",
    "Share Workspace": "共享工作区",
    "timer": "定时器",
    "Timers": "定时器",
    "Cron Jobs": "计划任务",
    "Schedule": "调度",
    "Directory analysis": "目录分析",
    "Web search": "网页搜索",
    "File edit": "文件编辑",
    "Command execution": "命令执行",
    "Semantic search": "语义搜索",

    // Added sentences & refined for user experience
    "Permissions": "权限",
    "Configure global allowed and denied resource permissions. Learn more.": "配置全局允许与拒绝的资源访问权限。了解更多。",
    "Configure global allowed and denied resource permissions.": "配置全局允许与拒绝的资源访问权限。",
    "Learn more.": "了解更多。",
    "Learn more": "了解更多",
    "Project-Specific Settings": "项目专属设置",
    "Project-Specific": "项目专属",
    "Modify scoped permissions, folders, and Agent settings like Sandbox and Terminal command execution.": "修改项目专属访问权限、工作文件夹以及智能体设置（例如沙盒和终端命令执行）。",
    "Modify scoped permissions, folders, and Agent settings": "修改项目专属访问权限、工作文件夹以及智能体设置",
    "like Sandbox and Terminal command execution.": "例如沙盒与终端命令执行。",
    "Go to Projects": "转到项目",
    "File Permissions": "文件权限",
    "File Access Rules": "文件访问规则",
    "Configure allowed and denied paths for file reads and writes.": "配置文件读写的允许与拒绝路径。",
    "Network Permissions": "网络权限",
    "Network Access Rules": "网络访问规则",
    "Configure allowed and denied URLs for reading.": "配置允许或禁止读取的 URL。",
    "Terminal & Tooling Permissions": "终端和工具权限",
    "Terminal Commands": "终端命令",
    "Configure allowed terminal commands.": "配置允许执行的终端命令。",
    "Commands Outside Sandbox": "沙盒外命令",
    "Configure allowed commands outside the sandbox.": "配置允许在沙盒外执行的终端命令。",
    "MCP Tools": "MCP 工具",
    "Configure external tools via Model Context Protocol.": "通过模型上下文协议 (MCP) 配置外部工具。",
    "Global": "全局",
    "Sandbox": "沙盒",
    "Sandbox enabled": "沙盒已启用",
    "Sandbox disabled": "沙盒已禁用",
    "Allowed": "已允许",
    "Denied": "已拒绝",
    "Paths": "路径",
    "URLs": "URL",
    "Tools": "工具",

    // Appearance & Settings
    "Appearance": "外观",
    "Configure the Agent's visual theme and display preferences.": "配置智能体的视觉主题与显示偏好。",
    "Chat Settings": "聊天设置",
    "Verbose Agent Chat": "显示智能体详细输出",
    "Display and preserve intermediate thinking steps": "显示并保留智能体中间思考过程",
    "Choose light, dark, or inherit system settings.": "选择浅色、深色，或继承系统设置。",
    "Dark": "深色",
    "Light": "浅色",
    "Light Theme": "浅色主题",
    "Preset": "预设",
    "Default Light": "默认浅色",
    "Background": "背景色",
    "Foreground": "前景色",
    "Accent": "强调色",
    "Dark Theme": "深色主题",
    "Default Dark": "默认深色",
    
    // Customizations
    "Customizations": "自定义",
    "Configure default behaviors, skills, and MCP servers.": "配置默认行为、技能以及 MCP 服务器。",
    "Token Usage": "Token 使用详情",
    "The breakdown below shows token usage from customizations like skills, rules, and MCP. If the budget is exceeded, large customizations will be truncated automatically.": "以下详情展示了来自技能、规则和 MCP 等自定义项的 Token 使用情况。如果额度超限，大型自定义内容将被自动截断。",
    "of the customization budget is available.": "的自定义额度可用。",
    "100.0% of the customization budget is available.": "100.0% 的自定义额度可用。",
    "No customizations found for this workspace.": "未找到此工作区的自定义项。",
    "Installed MCP Servers": "已安装的 MCP 服务器",
    "No MCP Servers": "无已安装的 MCP 服务器",
    "You currently don't have any MCP Servers installed.": "您当前未安装任何 MCP 服务器。",
    "Add an MCP server above": "在上方添加一个 MCP 服务器",
    "Build With Google Plugins": "使用 Google 插件构建",
    
    // Account
    "Account": "账号",
    "Manage your plan, credentials, and general preferences.": "管理您的计划、凭据和常规偏好。",
    "Enable Telemetry": "启用遥测",
    "When toggled on, Antigravity collects usage data to help Google enhance performance and features.": "开启后，Antigravity 会收集匿名使用数据，以帮助 Google 持续改进性能和功能。",
    "Marketing Emails": "营销电子邮件",
    "Receive product updates, tips, and promotions from Google Antigravity via email.": "通过电子邮件接收来自 Google Antigravity 的产品更新、技巧与促销信息。",
    "Your Plan:": "您的计划：",
    "Your Plan: Google AI Pro": "您的计划：Google AI Pro",
    "You can upgrade to a Google AI Ultra plan to receive the highest rate limits.": "您可以升级到 Google AI Ultra 计划以获得更高额的使用速率限制。",
    "Email": "电子邮件",
    
    // Browser & App Settings
    "Browser Settings": "浏览器设置",
    "Configure the browser subagent. It requires Google Chrome to be installed. The browser subagent can be invoked by typing /browser in the conversation input box.": "配置浏览器子智能体。这需要安装 Google Chrome。可以在对话输入框中输入 /browser 来调用浏览器子智能体。",
    "Configure the browser subagent. It requires Google Chrome to be installed. The browser subagent can be invoked by typing": "配置浏览器子智能体。这需要安装 Google Chrome。可以通过输入",
    "in the conversation input box.": "在对话输入框中调用该子智能体。",
    "Browser Javascript Execution Policy": "浏览器 JavaScript 执行策略",
    "Controls whether the agent can run custom JavaScript to automate complex browser actions.": "控制智能体是否可以运行自定义 JavaScript 以自动化复杂的浏览器操作。",
    "Request Review": "需要人工审核",
    "Disabled": "已禁用",
    "Block all browser JavaScript execution.": "禁止执行所有浏览器 JavaScript。",
    "Prompt for approval before running browser scripts.": "在运行浏览器脚本前需人工批准。",
    "Allow full browser script execution without prompting.": "允许执行所有浏览器脚本（无需提示）。",
    "Actuation Permissions": "动作执行权限",
    "Browser Actuation Rules": "浏览器操作控制规则",
    "Configure allowed and denied URLs for browser actuation.": "配置允许或禁止浏览器执行动作的 URL 列表。",
    "App Settings": "应用设置",
    "Prevent Sleep": "防止计算机休眠",
    "Prevent the computer from sleeping while the app is running.": "在应用运行时防止计算机进入休眠状态。",
    "Keep In Menu Bar": "常驻系统托盘",
    "The app will be accessible from the menu bar and will keep running in the background when all windows are closed.": "关闭所有窗口后，应用将常驻菜单栏并在后台保持运行。",
    "Notifications": "通知",
    "Notification Settings": "通知设置",
    "To modify notification settings, open your operating system's system preferences.": "如需修改通知设置，请打开您操作系统的系统偏好设置。",

    // Agent Settings
    "Agent Settings": "智能体设置",
    "Security Preset": "安全预设",
    "Choose a predefined security preset for the agent. This controls terminal auto-execution policy, and file access policy.": "为智能体选择预定义的安全预设。这将控制终端自动执行策略和文件访问策略。",
    "Choose a predefined security preset for the agent.": "为智能体选择预定义的安全预设。",
    "This controls terminal auto-execution policy, and file access policy.": "这将控制终端自动执行策略和文件访问策略。",
    "Learn more about Default": "了解关于默认预设的更多信息",
    "Default": "默认",
    "Agent Behavior": "智能体行为",
    "Artifact Review Policy": "工件审核策略",
    "Specifies agent's behavior when asking for review on artifacts, which are documents it creates to enable a richer conversation experience.": "设置智能体在请求审核工件时的行为方式。工件是其为提供更丰富对话体验而创建的文档。",
    "Always Ask": "始终询问",
    "Local Permissions": "项目专属权限",
    "Inherits from global settings. Local permissions have higher priority.": "继承自全局设置。项目专属权限具有更高的优先级。",
    "Inherits from global settings.": "继承自全局设置。",
    "Local permissions have higher priority.": "项目专属权限具有更高的优先级。",
    "Danger Zone": "危险区域",
    "Delete Project": "删除项目",
    "Permanently delete this project and all of its conversations.": "永久删除当前项目及其包含的所有历史对话。",
    
    // Additional Agent Settings & Context Menu
    "Custom": "自定义",
    "Outside of folders file access policy": "文件夹外文件访问策略",
    "Configures how the agent tries to access files outside of its working folders.": "配置智能体如何尝试访问其工作文件夹外部的文件。",
    "Terminal command Auto execution": "终端命令自动执行",
    "Controls whether terminal commands require your approval before running.": "控制终端命令在运行前是否需要您批准。",
    "Require Review": "需要审核",
    "Add Context": "添加上下文",
    "Media": "媒体",
    "Mentions": "提及",
    "Actions": "操作",
    "Browser": "浏览器",
    "Worktree": "工作树",
    "Projects": "项目",
    "Review Changes": "审核更改",
    "Ask anything, @ to mention, / for actions": "输入任何问题，输入 @ 提及，/ 触发操作",
    "Ask anything, @to mention, /for actions": "输入任何问题，输入 @ 提及，/ 触发操作",
    "Ask anything, @ to mention, / for commands": "输入任何问题，输入 @ 提及，/ 触发命令",
    "Ask anything, @to mention, /for commands": "输入任何问题，输入 @ 提及，/ 触发命令",
    "Overview": "概览",
    "Artifacts": "工件",
    "Conversations": "对话",
    "Agent settings and permissions for conversations outside of projects.": "项目外部对话的智能体设置和权限配置。",
    "Not in Project": "不在项目中",
    "Manage project folders, agent settings, and permissions.": "管理项目文件夹、智能体设置和专属权限。",

    // Security Presets
    "Requires manual review for all terminal commands and file accesses outside of the working folders.": "运行终端命令以及访问工作区外的文件时，均需手动人工审核。",
    "Full Machine": "完整本机访问",
    "All terminal commands require review. The agent can read or write to any file in the machine.": "所有终端命令均需审核，智能体可读写本机上的任意文件。",
    "Unrestricted": "无限制模式",
    "Disables all safety barriers for maximal iteration velocity.": "禁用所有安全屏障以获得极致的迭代效率。",
    "Manually customize individual settings.": "手动自定义各项具体设置。",
    "Always Proceed": "自动继续",

    // Themes
    "One Light": "One 浅色",
    "Solarized Light": "Solarized 浅色",
    "One Dark Pro": "One 深色 Pro",
    
    // Models
    "Configure AI models and view your quota.": "配置 AI 模型并查看您的配额与可用点数。",
    "Refresh": "刷新",
    "Model Credits": "模型额度",
    "Enable AI Credit Overages": "允许 AI 额度超限使用",
    "When toggled on, Antigravity will use your AI credits to fulfill model requests once you're out of model quota. Antigravity will always use your model quota first before using AI credits.": "开启后，当您的免费配额耗尽时，Antigravity 将使用您的 AI 点数来满足请求。系统会优先扣除免费模型配额，配额不足时再使用点数。",
    "Model Quota": "模型配额",
    "View your available model quota and AI credits. Model quota refreshes periodically based on your plan. Enable AI Credit Overages to continue using models when your quota is exhausted.": "查看您的可用模型配额与 AI 账户额度。模型配额会根据您的订阅计划定期刷新。额度耗尽后，可开启 AI 额度超限使用以继续体验。",

    // Shortcuts & UI
    "Shortcuts": "快捷键",
    "Keyboard shortcuts for quick navigation and control.": "用于快速导航与控制的键盘快捷键。",
    "Recommended": "推荐",
    "Open Conversation Picker": "打开对话选择器",
    "Open File Search": "打开文件搜索",
    "Focus Input": "聚焦输入框",
    "New Conversation": "新建对话",
    "Navigation": "导航",
    "Go Back": "后退",
    "Go Forward": "前进",
    "File Picker": "文件选择器",
    "Scheduled Tasks": "计划任务",
    "Select Previous Conversation": "选择上一个对话",
    "Select Next Conversation": "选择下一个对话",
    "Open Settings": "打开设置",
    "Conversation": "对话",
    "Conversation History": "历史对话",
    "Conversation history": "历史对话",
    "Toggle Model Selector": "切换模型选择器",
    "Toggle Voice Recording": "切换录音",
    "Find in Pane": "在窗格中查找",
    "Layout Controls": "布局控制",
    "Toggle Sidebar": "切换侧边栏",
    "Toggle Auxiliary Pane": "切换辅助窗格",
    "Zoom In": "放大",
    "Zoom Out": "缩小",
    "Reset Zoom": "重置缩放",

    // Feedback
    "Provide Feedback": "提供反馈",
    "Feedback Type": "反馈类型",
    "Bug Report": "Bug 报告",
    "Feature Request": "功能请求",
    "Auth and Billing": "账号与计费",
    "General Feedback": "常规反馈",
    "Please describe the feature you'd like to see. The more detailed the requirements, the easier it will be for our team to incorporate your ideas. Some helpful information includes:": "请描述您希望获得的新功能。需求描述越详尽，我们的团队就越容易采纳您的想法。以下是一些建议提供的信息：",
    "What is missing in your workflow": "您的工作流中缺少了什么",
    "What you would like to see to address this gap in your workflow": "您希望通过什么功能来解决这一需求",
    "How this feature would help you and other users": "此功能如何帮助您和其他用户",
    "Describe the feature you would like to see...": "请描述您希望获得的新功能...",
    "Attach a screenshot (optional)": "添加屏幕截图（可选）",
    "Attach Antigravity server logs": "附带 Antigravity 服务器日志",
    "Send feedback as": "发送反馈身份",
    "We recommend attaching logs. Attaching logs will help the Antigravity team act on and prioritize your feedback.": "我们建议附带日志。这将有助于 Antigravity 团队更快速、更有针对性地处理您的问题。",

    // Automatic Update Menus
    "Checking for Updates...": "正在检查更新...",
    "Downloading Update...": "正在下载更新...",
    "Restart to Update": "重启以应用更新",
    "Check for Updates": "检查更新",
    "No updates available": "当前已是最新版本",
    "Update available": "发现新版本",
    "Downloading...": "正在下载...",
    "Update downloaded": "更新已下载完成",
    "Error checking for updates": "检查更新失败",

    // ===== 2.2.1 新增 UI 文本补充 =====
    // 窗口与原生 UI
    "Window": "窗口",
    "Install IDE": "安装 IDE",
    "App": "应用",

    // 偏好设置区
    "Inherits from": "继承自",
    "Rules": "规则",
    "Skills": "技能",
    "Plugin": "插件",
    "Plugins": "插件",
    "Customize": "自定义",
    "Setup": "设置",

    // 账号区
    "Google AI Pro": "Google AI Pro",
    "Upgrade": "升级",
    "Sign Out": "退出登录",
    "By using this app, you agree to its": "使用本应用即表示您同意其",
    "Terms of Service": "服务条款",
    "Google Drive integration not available": "Google 云端硬盘集成不可用",

    // 外观与编辑器
    "Select light, dark, or inherit system settings.": "选择浅色、深色，或继承系统设置。",
    "Configure editor-specific behaviors and shortcuts.": "配置编辑器专属行为与快捷键。",
    "Tab": "制表符",
    "Configure tab completion, suggestions, and navigation behavior.": "配置 Tab 补全、建议以及导航行为。",

    // 编辑器与市场
    "Marketplace": "扩展市场",
    "Marketplace Item URL": "扩展市场项目 URL",
    "Marketplace Gallery URL": "扩展市场图库 URL",
    "Changes the base URL on each extension page. You must restart Antigravity to use the new marketplace after changing this value.": "更改每个扩展页面的基础 URL。更改此值后，必须重启 Antigravity 才能使用新的扩展市场。",
    "Changes the base URL for marketplace search results. You must restart Antigravity to use the new marketplace after changing this value.": "更改扩展市场搜索结果的基础 URL。更改此值后，必须重启 Antigravity 才能使用新的扩展市场。",
    "To modify editor settings, open Settings within the editor window.": "如需修改编辑器设置，请在编辑器窗口中打开“设置”。",
    "Editor": "编辑器",
    "Editor Settings": "编辑器设置",
    "Open Editor Settings": "打开编辑器设置",

    // 浏览器子智能体
    "Configure the browser subagent.": "配置浏览器子智能体。",
    "It requires": "它需要",
    "Google Chrome to be installed.": "安装 Google Chrome。",
    "The browser subagent can be invoked by typing": "可以通过输入",
    "/browser": "/browser",
    "in the conversation input box.": "在对话输入框中调用浏览器子智能体。",

    // 对话区
    "Conversation Width": "对话宽度",
    "Configure the maximum width of the conversation panel.": "配置对话面板的最大宽度。",
    "New Conversation in Project": "项目内新建对话",
    "Show": "显示",
    "all": "全部",

    // 分解统计
    "breakdown": "明细",
    "breakdowns": "明细",

    // Google Chat / Jetski
    "Configure a chat bot so you can use Jetski directly from Google Chat.": "配置一个聊天机器人，以便您可以直接在 Google Chat 中使用 Jetski。",
    "Jetski Chat": "Jetski 聊天",
    "Setup Jetski Chat": "设置 Jetski 聊天",
    "Bot Name": "机器人名称",
    "Avatar URL": "头像 URL",
    "Enter bot name (optional)": "输入机器人名称（可选）",
    "Enter avatar URL (optional)": "输入头像 URL（可选）",
    "Chat Space": "聊天空间",
    "Continue to help, visit": "如需继续获取帮助，请访问",

    // 反馈区
    "Please describe the issue in detail. The more actionable your feedback, the quicker our team can address your request. Some helpful information includes:": "请详细描述您遇到的问题。反馈越具可操作性，我们的团队就能越快处理您的请求。以下是一些有用的信息：",
    "Steps to reproduce the issue": "问题复现步骤",
    "Expected behavior": "预期行为",
    "Actual behavior": "实际行为",
    "Any relevant information": "任何相关信息",
    "Any error messages": "任何错误消息",
    "Steps to Reproduce": "复现步骤",
    "Submit": "提交",
    "Describe the bug you encountered...": "请描述您遇到的 Bug...",
    "Please list the steps to reproduce the issue": "请列出复现该问题的步骤",

    // 通知与其他
    "Manage your notification preferences.": "管理您的通知偏好。",
    "Manage application settings.": "管理应用设置。",
    "Refresh quota and credits data": "刷新配额与额度数据",

    // 权限与提示
    "Local permissions have higher priority.": "项目专属权限具有更高的优先级。",
    "No conversations yet": "暂无对话",
    "No conversation yet": "暂无对话",
    "of the customization budget is available.": "的自定义额度可用。",

    // MCP 相关
    "Add MCP": "添加 MCP",
    "Add an MCP Server": "添加 MCP 服务器",

    // 单词补充(2.2.1 新出现的)
    "width": "宽度",
    "priority": "优先级",
    "quota": "配额",
    "credits": "额度",
    "preference": "偏好",
    "preferences": "偏好",
    "application": "应用",
    "subagent": "子智能体",
    "notification": "通知",
    "notifications": "通知",
    "bot": "机器人",
    "space": "空间",
    "visit": "访问",
    "editor": "编辑器",
    "marketplace": "扩展市场",
    "avatar": "头像",
    "name": "名称",
    "messages": "消息",
    "message": "消息",

    // ===== 第2轮验证新增 (2.2.1 配额/限额/aria-label) =====
    "Weekly Limit": "每周限额",
    "Five Hour Limit": "五小时限额",
    "Hourly Limit": "每小时限额",
    "Daily Limit": "每日限额",
    "Monthly Limit": "每月限额",
    "limit": "限额",
    "limits": "限额",
    "weekly": "每周",
    "hourly": "每小时",
    "customization": "自定义",
    "budget": "额度",
    "available": "可用",

    // 浏览器设置残片补全
    "to be installed.": "需要安装。",
    "to be installed": "需要安装",
    "or join the": "或加入",

    // aria-label 无障碍标签 (这些会影响屏幕阅读器与提示)
    "Sidebar": "侧边栏",
    "Display Options": "显示选项",
    "Message input": "消息输入框",
    "Record voice memo": "录制语音备忘",
    "Typeahead menu": "预输入菜单",
    "voice memo": "语音备忘",
    "memo": "备忘",
    "typeahead": "预输入",

    // ===== 第3轮验证补充 =====
    "current": "当前",
    "Choose a model": "选择模型",
    "Select model": "选择模型",
    "current model": "当前模型",

    // ===== 第4轮验证补充 (显示选项下拉菜单) =====
    "Group By": "分组方式",
    "Last Updated": "最后更新",
    "Alphabetical (A-Z)": "字母顺序 (A-Z)",
    "Date Added": "添加日期",
    "Subtitles": "副标题",
    "No Subtitle": "无副标题",
    "Filter": "筛选",
    "Scheduled": "已计划",
    "Environment": "环境",
    "None": "无",
    "Fast": "快速",

    // 第5轮: 单数形式补全 (分组选项)
    "Project": "项目",
    "project": "项目",
    "projects": "项目",
    "Conversation": "对话",
    "conversation": "对话",
    "Workspace": "工作区",
    "workspace": "工作区",

    // ===== 第6轮彻底验证补充 =====
    // 窗口控制
    "Minimize": "最小化",
    "Maximize": "最大化",
    "Back": "返回",
    // 计划任务
    "No scheduled tasks configured.": "暂无已配置的计划任务。",
    // 配额提示 (含动态时间,用部分匹配)
    "You have used some of your weekly limit": "您已使用部分每周限额",
    "You have used some of your 5-hour limit": "您已使用部分 5 小时限额",
    "it will fully refresh in": "它将在以下时间后完全刷新：",
    "hours": "小时",
    "minutes": "分钟",
    "days": "天",
    // 文件夹与权限
    "Folders": "文件夹",
    "folders": "文件夹",
    "including": "包括",
    "Allow/deny agent read access to specific files or directories.": "允许/拒绝智能体读取特定文件或目录。",
    "Allow/deny agent write access to specific files or directories.": "允许/拒绝智能体写入特定文件或目录。",
    "Allow/deny": "允许/拒绝",
    "read access": "读取权限",
    "write access": "写入权限",
    "specific files or directories": "特定文件或目录",
    // 浏览器子智能体说明(完整句)
    "The browser subagent can be invoked by typing /browser in the conversation input box.": "可以在对话输入框中输入 /browser 来调用浏览器子智能体。",

    // ===== 第7轮验证补充 (项目/文件夹状态提示) =====
    "Missing": "缺失",
    "Missing folder": "缺失文件夹",
    "Missing Folder": "缺失文件夹",
    "does not exist": "不存在",
    "not found": "未找到",
    "Not Found": "未找到",
    "No longer available": "已不可用",
    "Path": "路径",

    // ===== Antigravity 2.12.0+ 深度汉化补充 =====
    // 规划模式 (Planning Mode)
    "Planning Mode": "规划模式",
    "planning mode": "规划模式",
    "Planning Mode is ON": "规划模式已开启",
    "Planning Mode is OFF": "规划模式已关闭",
    "Implementation Plan": "实施计划",
    "implementation plan": "实施计划",
    "implementation_plan.md": "实施计划.md",
    "Walkthrough": "变更回顾",
    "walkthrough": "变更回顾",
    "walkthrough.md": "变更回顾.md",
    "User Review Required": "需用户审批",
    "Open Questions": "待确认问题",
    "Proposed Changes": "拟定变更",
    "Verification Plan": "验证计划",
    "Automated Tests": "自动化测试",
    "Manual Verification": "手动验证",
    "Proceed": "继续执行",
    "Plan Execution": "计划执行",
    "Approve Plan": "批准计划",
    "Reject Plan": "拒绝计划",
    "Plan approved": "计划已批准",
    "Plan rejected": "计划已拒绝",
    "Creating plan...": "正在生成计划...",
    "Updating plan...": "正在更新计划...",
    "Reviewing plan...": "正在审核计划...",
    "Implementation plan created": "实施计划已创建",
    "Implementation plan updated": "实施计划已更新",
    "Exit Planning Mode": "退出规划模式",
    "Enter Planning Mode": "进入规划模式",
    "Plan Mode": "规划模式",
    "Plan": "计划",
    "Goal Description": "目标描述",
    "Component Name": "组件名称",

    // 模型与深度推理控制 (Models & Reasoning)
    "Reasoning Effort": "推理深度",
    "reasoning effort": "推理深度",
    "High reasoning effort": "高推理深度",
    "Medium reasoning effort": "中推理深度",
    "Low reasoning effort": "低推理深度",
    "Auto reasoning effort": "自动推理深度",
    "Thinking Budget": "思考预算",
    "thinking budget": "思考预算",
    "Reasoning": "推理思考",
    "Thinking": "思考中",
    "Thought": "思考",
    "Thought process": "思考过程",
    "Internal reasoning": "内部推理",
    "Gemini 3.8 Flash (High)": "Gemini 3.8 Flash (高思考)",
    "Gemini 3.8 Flash (Low)": "Gemini 3.8 Flash (低思考)",
    "Gemini 3.8 Pro": "Gemini 3.8 Pro",
    "Gemini 2.5 Flash": "Gemini 2.5 Flash",
    "Gemini 2.5 Pro": "Gemini 2.5 Pro",
    "Claude 3.7 Sonnet": "Claude 3.7 Sonnet",
    "Claude 3.7 Sonnet (Thinking)": "Claude 3.7 Sonnet (深度思考)",
    "Claude 3.5 Sonnet": "Claude 3.5 Sonnet",
    "Default model": "默认模型",
    "Inherit model": "继承模型",
    "Select a model": "选择模型",
    "Model tier": "模型级别",
    "Token usage": "Token 用量",
    "Context window": "上下文窗口",
    "Remaining tokens": "剩余 Token",

    // 多智能体协同与子智能体 (Subagents & Teamwork)
    "Teamwork": "团队协作",
    "teamwork": "团队协作",
    "Manage Subagents": "管理子智能体",
    "manage subagents": "管理子智能体",
    "Active Subagents": "活跃子智能体",
    "Invoke subagent": "调用子智能体",
    "Define subagent": "定义子智能体",
    "Kill subagent": "终止子智能体",
    "Kill all": "终止全部",
    "Waiting for input": "等待输入",
    "Waiting for dependents": "等待依赖任务",
    "Waiting for message": "等待消息",
    "Canceling": "正在取消",
    "Errored": "发生错误",
    "Idle": "空闲",
    "Unspecified": "未指定",
    "Research Agent": "调研智能体",
    "Codebase Researcher": "代码库调研员",
    "Conversation ID": "对话 ID",
    "Conversation transcript": "对话记录",
    "Transcript logs": "转录日志",
    "Reactive Wakeup": "响应式唤醒",
    "No polling needed": "无需轮询",
    "Subagent conversation": "子智能体对话",
    "Parent agent": "父智能体",
    "Child agent": "子智能体",

    // 工作区隔离与分支模式
    "Branch Workspace": "分支隔离工作区",
    "Share Workspace": "共享工作区",
    "Inherit Workspace": "继承工作区",
    "Isolated branch": "隔离分支",
    "Shared repository": "共享仓库",
    "Workspace directory permissions": "工作区目录权限",
    "Active workspace": "活动工作区",
    "Switch workspace": "切换工作区",
    "Add folder to workspace": "添加文件夹到工作区",
    "Remove from workspace": "从工作区移除",

    // MCP 与扩展工具体系
    "MCP Servers": "MCP 服务器",
    "MCP Server": "MCP 服务器",
    "MCP Tools": "MCP 工具",
    "Call MCP Tools": "调用 MCP 工具",
    "Active MCPs": "活跃 MCP 服务",
    "Connectors": "连接器",
    "Configure MCP server": "配置 MCP 服务器",
    "Inspect parameters": "检查参数",
    "Tool execution": "工具执行",
    "Tool call": "工具调用",
    "Tool calls": "工具调用",
    "Tool summary": "工具摘要",
    "Tool action": "工具操作",
    "Built-in tools": "内置工具",
    "External tools": "外部工具",
    "Running command": "运行命令",
    "Analyzing directory": "分析目录",
    "Searching the web": "搜索网页",
    "Editing file": "编辑文件",
    "Viewing file": "查看文件",
    "Semantic searching": "语义搜索",

    // 权限控制与沙盒增强
    "Sandbox": "沙盒",
    "Sandboxed": "沙盒内",
    "Unsandboxed": "沙盒外",
    "Commands Outside Sandbox": "沙盒外命令",
    "Terminal & Tooling Permissions": "终端与工具权限",
    "Network Access Rules": "网络访问规则",
    "File Access Rules": "文件访问规则",
    "Allowed paths": "允许路径",
    "Denied paths": "拒绝路径",
    "Allowed commands": "允许命令",
    "Denied commands": "拒绝命令",
    "Allowed URLs": "允许的 URL",
    "Denied URLs": "拒绝的 URL",
    "Always allow": "总是允许",
    "Ask every time": "每次询问",
    "Deny by default": "默认拒绝",
    "Allowlist": "白名单",
    "Denylist": "黑名单",
    "Global permissions": "全局权限",
    "Project permissions": "项目权限",

    // 定时任务与调度 (Schedule & Cron)
    "Schedule": "计划调度",
    "One-shot timer": "单次定时器",
    "Recurring cron": "循环定时任务",
    "Cron expression": "Cron 表达式",
    "Duration in seconds": "持续秒数",
    "Max iterations": "最大执行次数",
    "Timer condition": "定时条件",
    "Early termination": "提前终止",
    "Any message": "任何消息",
    "Specific sender": "特定发送者",
    "Expired": "已过期",

    // 自定义技能与规则 (Customizations & Skills)
    "Customizations": "自定义配置",
    "Skills": "技能",
    "Skill": "技能",
    "Rules": "规则",
    "Rule": "规则",
    "Plugins": "插件",
    "Sidecars": "伴生进程 (Sidecars)",
    "Hooks": "钩子",
    "App Data Directory": "应用数据目录",
    "Artifact": "工件",
    "Artifacts": "工件",
    "Artifact metadata": "工件元数据",

    // 通用界面与交互
    "Loading Antigravity": "正在加载 Antigravity...",
    "Setting up…": "正在启动/设置中...",
    "Setting up...": "正在启动/设置中...",
    "Recent Workspaces": "最近工作区",
    "Clear Cache": "清除缓存",
    "Reset Settings": "重置设置",
    "Log Out": "退出登录",
    "Sign In": "登录",
    "Sign in with Google": "使用 Google 账号登录",
    "Signed in as": "当前登录为",
    "Check for Updates": "检查更新",
    "Checking for Updates...": "正在检查更新...",
    "Downloading Update...": "正在下载更新...",
    "Restart to Update": "重启以应用更新",
    "Up to date": "已是最新版本",
    "New version available": "有新版本可用",
    "Copy code": "复制代码",
    "Copied!": "已复制！",
    "Copied": "已复制",
    "Collapse": "折叠",
    "Expand": "展开",
    "Show more": "显示更多",
    "Show less": "显示更少",
    "Details": "详情",
    "Overview": "概览"
  };

  const coreWords = {
    "create": "创建", "delete": "删除", "new": "新建", "edit": "编辑", "save": "保存", "cancel": "取消", "confirm": "确认",
    "close": "关闭", "open": "打开", "stop": "停止", "start": "启动", "run": "运行", "add": "添加", "remove": "移除",
    "update": "更新", "select": "选择", "clear": "清除", "search": "搜索", "find": "查找", "view": "查看", "show": "显示", "hide": "隐藏",
    "agent": "智能体", "agents": "智能体", "subagent": "子智能体", "subagents": "子智能体", "task": "任务", "tasks": "任务",
    "workspace": "工作区", "workspaces": "工作区", "directory": "目录", "folder": "文件夹", "file": "文件", "files": "文件",
    "command": "命令", "commands": "命令", "terminal": "终端", "console": "控制台", "output": "输出", "input": "输入",
    "log": "日志", "logs": "日志", "setting": "设置", "settings": "设置", "preference": "偏好", "preferences": "偏好",
    "theme": "主题", "themes": "主题", "model": "模型", "models": "模型", "capability": "能力", "capabilities": "能力",
    "running": "运行中", "completed": "已完成", "failed": "已失败", "pending": "等待中", "success": "成功", "error": "错误",
    "system": "系统", "prompt": "提示词", "instructions": "指令", "description": "描述", "name": "名称", "version": "版本",
    "active": "活跃", "background": "后台", "parent": "父级", "child": "子级", "branch": "分支", "share": "共享", "inherit": "继承",
    "original": "原始", "backup": "备份", "duration": "持续时间", "seconds": "秒", "timer": "定时器", "timers": "定时器",
    "schedule": "调度", "cron": "定时任务", "tools": "工具", "tool": "工具", "execute": "执行", "execution": "执行", "plan": "计划",
    "chat": "聊天", "message": "消息", "messages": "消息", "history": "历史", "clear history": "清除历史",
    "worked": "工作了", "changed": "已更改", "review": "审核", "reviewing": "审核中", "reviewed": "已审核", "for": "持续",
    "thought": "思考了", "edited": "编辑了", "canceled": "已取消", "js": "Js",
    "explore": "探索", "explored": "浏览了", "change": "更改", "changes": "更改",
    "turn": "回合", "turns": "回合"
  };

  const combinedDict = Object.assign({}, coreWords, dictionary);

  const escapeRegExp = (str) => {
    const specials = ['[', ']', '(', ')', '{', '}', '*', '+', '?', '.', '^', '$', '|', '\\'];
    return str.split('').map(c => specials.includes(c) ? '\\' + c : c).join('');
  };

  function translateString(text) {
    if (!text) return text;
    const trimmed = text.trim();
    if (!trimmed) return text;

    // --- Dynamic Agent Logs Regex Rules (Fixed Escaping) ---
    let dynamicMatch = trimmed;
    let isDynamic = false;
    
    if (/^Worked for \d+s$/.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/Worked for (\d+)s/, '已工作 $1 秒');
      isDynamic = true;
    }
    if (/^Thought for \d+s$/.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/Thought for (\d+)s/, '已思考 $1 秒');
      isDynamic = true;
    }
    if (/^Edited .* \+\d+ -\d+$/.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/Edited (.*) \+(\d+) -(\d+)/, '编辑了 $1 (+$2 -$3)');
      isDynamic = true;
    }
    if (/^\d+ files? changed$/.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^(\d+) files? changed(.*)/, '$1 个文件已更改$2');
      isDynamic = true;
    }
    if (/^Explored/.test(trimmed)) {
      if (/^Explored \d+ files?$/.test(trimmed)) {
        dynamicMatch = dynamicMatch.replace(/^Explored (\d+) files?(.*)/, '浏览了 $1 个文件$2');
      } else if (/^Explored (.*)$/.test(trimmed)) {
        dynamicMatch = dynamicMatch.replace(/^Explored (.*)/, '浏览了 $1');
      }
      isDynamic = true;
    }
    if (/^Canceled taskkill/.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^Canceled (.*)/, '已取消 $1');
      isDynamic = true;
    }

    // 配额提示句 (含动态天数/小时/分钟)
    if (/^You have used some of your (weekly|5-hour|hourly|daily) limit/.test(trimmed)) {
      dynamicMatch = dynamicMatch
        .replace(/^You have used some of your weekly limit/, '您已使用了部分每周限额')
        .replace(/^You have used some of your 5-hour limit/, '您已使用了部分 5 小时限额')
        .replace(/^You have used some of your hourly limit/, '您已使用了部分每小时限额')
        .replace(/^You have used some of your daily limit/, '您已使用了部分每日限额')
        .replace(/it will fully refresh in/, '它将在以下时间后完全刷新：')
        .replace(/(d+)s*days?/g, '$1 天 ')
        .replace(/(d+)s*hours?/g, '$1 小时 ')
        .replace(/(d+)s*minutes?.?$/g, '$1 分钟')
        .replace(/[,.]/g, '');
      isDynamic = true;
    }
    // 模型分组配额说明长句
    if (/^Within each group, models share/.test(trimmed)) {
      dynamicMatch = '在每个分组中，模型共享每周限额和 5 小时限额。配额按 token 成本比例消耗。因此，较短的任务或使用更具性价比的模型时，限额可持续更长时间。5 小时限额用于平滑总需求，以便在所有用户间公平分配全球容量，而每周限额则与您的个人等级直接挂钩。';
      isDynamic = true;
    }

    // 项目/路径不存在的动态提示 (项目名 + " does not exist"，超3词无法走分词)
    if (/^.+ does not exist.?$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^(.+) does not exist.?$/i, '$1 不存在');
      isDynamic = true;
    }
    // "xxx was not found" 动态提示
    if (/^.+ was not found.?$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^(.+) was not found.?$/i, '$1 未找到');
      isDynamic = true;
    }

    // 步骤与回合动态提示
    if (/^Step d+ ([^)]+):?$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^Step (d+) (([^)]+)):?/i, '步骤 $1 ($2)：');
      isDynamic = true;
    }
    if (/^d+ turns?$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^(d+) turns?$/i, '$1 回合');
      isDynamic = true;
    }
    if (/^Turn d+$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^Turn (d+)$/i, '第 $1 回合');
      isDynamic = true;
    }
    if (/^Task id "[^"]+" finished with result:$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^Task id "([^"]+)" finished with result:$/i, '任务 "$1" 执行完成：');
      isDynamic = true;
    }
    if (/^Tool is running as a background task with task id: (.+)$/i.test(trimmed)) {
      dynamicMatch = dynamicMatch.replace(/^Tool is running as a background task with task id: (.+)$/i, '工具正在后台运行 (任务ID: $1)');
      isDynamic = true;
    }

    if (isDynamic) {
      return text.replace(trimmed, dynamicMatch);
    }
    // --- End Dynamic Regex ---

    // 1. Direct Literal Match (Exact match including punctuation)
    if (dictionary[trimmed]) {
      return text.replace(trimmed, dictionary[trimmed]);
    }
    
    const trimmedLower = trimmed.toLowerCase();
    for (const key in dictionary) {
      if (key.toLowerCase() === trimmedLower) {
        return text.replace(trimmed, dictionary[key]);
      }
    }

    // 2. Intelligent Punctuation Stripping & Reconstruction
    let core = trimmed;
    let trailPunc = '';
    let matchPunc = '';

    // Strip trailing common punctuation
    const puncRegex = /(\.\.\.|…|\.|\?|!|:|：|？|！|。)$/;
    const match = core.match(puncRegex);
    if (match) {
      matchPunc = match[0];
      core = core.slice(0, -matchPunc.length).trim();
      
      // Determine the correct Chinese counterpart punctuation
      if (matchPunc === '.') trailPunc = '。';
      else if (matchPunc === '?') trailPunc = '？';
      else if (matchPunc === '!') trailPunc = '！';
      else if (matchPunc === ':') trailPunc = '：';
      else if (matchPunc === '：') trailPunc = '：';
      else if (matchPunc === '？') trailPunc = '？';
      else if (matchPunc === '！') trailPunc = '！';
      else if (matchPunc === '。') trailPunc = '。';
      else trailPunc = matchPunc; // keep ..., …
    }

    // Check stripped core in dictionary
    let coreTranslated = '';
    if (dictionary[core]) {
      coreTranslated = dictionary[core];
    } else {
      const coreLower = core.toLowerCase();
      for (const key in dictionary) {
        if (key.toLowerCase() === coreLower) {
          coreTranslated = dictionary[key];
          break;
        }
      }
    }

    if (coreTranslated) {
      return text.replace(trimmed, coreTranslated + trailPunc);
    }

    // 3. Fallback to word-by-word ONLY for short strings (<= 3 words)
    // 如果短语中已经包含了中文字符（即原本就是汉化内容或中英混排），则严禁进入英文分词翻译
    // 这可以完美阻止像中英文混排短语被分词规则执行二次翻译导致重叠和污染
    if (/[一-龥]/.test(core)) {
      return text;
    }
    // This prevents long unmatched sentences from getting mangled into Chinglish.
    const wordsCount = core.split(/s+/).filter(Boolean).length;
    if (wordsCount > 3) {
      return text; // Do not translate, keep original English sentence clean
    }

    let temp = core;
    let replaced = false;
    const sortedKeys = Object.keys(combinedDict).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (key.length <= 3 && !/^[a-zA-Z0-9]+$/.test(key)) continue;
      const escapedKey = escapeRegExp(key);
      const startBoundary = /^[a-zA-Z0-9]/.test(key) ? '\\b' : '';
      const endBoundary = /[a-zA-Z0-9]$/.test(key) ? '\\b' : '';
      const regex = new RegExp(startBoundary + escapedKey + endBoundary, 'gi');
      if (regex.test(temp)) {
        temp = temp.replace(regex, combinedDict[key]);
        replaced = true;
      }
    }

    let finalTranslated = replaced ? temp : core;
    // 消除中文字符之间可能由分词替换残留的英文空格，提升翻译句子的连贯精致度
    finalTranslated = finalTranslated.replace(/([一-龥])s+([一-龥])/g, '$1$2');
    if (matchPunc) {
      finalTranslated += trailPunc;
    }
    return text.replace(trimmed, finalTranslated);
  }

  // 用于模糊匹配类名中包含代码/预览/diff相关关键词的正则
  const codeClassPattern = /(?:^|[\s_-])(code|diff|source|syntax|highlight|viewer|hljs|shiki|prism|monaco|codemirror|token|line-number|line-content|gutter|codeblock|code-block|code-view|code-preview|file-preview|file-content)(?:$|[\s_-])/i;

  function shouldSkipNode(node) {
    if (!node) return true;
    
    // 如果是文本节点，我们检查其父元素；如果是属性/元素节点，检查自身
    const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if (!element) return false;

    // 1. 绝对不能翻译的脚本/样式/代码块标签
    const skipTags = ['SCRIPT', 'STYLE', 'CODE', 'PRE', 'NOSCRIPT', 'KBD', 'SAMP', 'VAR'];
    if (skipTags.includes(element.tagName)) {
      return true;
    }

    // 2. 如果是文本节点，并且其父元素是输入框/文本域，必须跳过文本节点翻译
    if (node.nodeType === Node.TEXT_NODE) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        return true;
      }
    }

    // 3. 检查元素自身是否带有代码语言标记属性
    if (element.getAttribute) {
      if (element.getAttribute('data-language') || 
          element.getAttribute('data-code') ||
          element.getAttribute('data-line') ||
          element.getAttribute('data-line-number')) {
        return true;
      }
    }

    // 4. 向上递归检查祖先节点
    let cur = element;
    while (cur) {
      // 4a. contenteditable 区域
      if (cur.getAttribute && cur.getAttribute('contenteditable') === 'true') {
        return true;
      }

      // 4b. 检查 data 属性（代码块语言标记等）
      if (cur.getAttribute) {
        if (cur.getAttribute('data-language') || 
            cur.getAttribute('data-code') ||
            cur.getAttribute('data-line') ||
            cur.getAttribute('data-line-number')) {
          return true;
        }
      }

      // 4c. 检查 role 属性
      if (cur.getAttribute) {
        const role = cur.getAttribute('role');
        if (role === 'code') {
          return true;
        }
      }

      // 4d. 精确类名匹配 — 已知的编辑器/输入区域
      if (cur.classList && (
        cur.classList.contains('monaco-editor') || 
        cur.classList.contains('editor-instance') ||
        cur.classList.contains('input-area') ||
        cur.classList.contains('chat-input')
      )) {
        return true;
      }

      // 4e. 类名匹配 — 精确与模糊检测（高精度防御，防止 Tailwind 选择器如 [&_code] 引起的误杀）
      if (cur.className && typeof cur.className === 'string') {
        const lowerClass = cur.className.toLowerCase();
        if (
          lowerClass.includes('code-line') ||
          lowerClass.includes('select-contain') ||
          lowerClass.includes('font-mono') ||
          codeClassPattern.test(cur.className)
        ) {
          return true;
        }
      }

      // 4f. 检查 tagName: 如果在 PRE 或 CODE 结构内部也应跳过
      if (cur.tagName === 'PRE' || cur.tagName === 'CODE') {
        return true;
      }

      cur = cur.parentElement;
    }

    return false;
  }

  function translateNode(node) {
    if (!node) return;
    if (shouldSkipNode(node)) return;

    if (node.nodeType === Node.TEXT_NODE) {
      const original = node.nodeValue;
      const translated = translateString(original);
      if (original !== translated) {
        node.nodeValue = translated;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      ['placeholder', 'title', 'aria-label', 'value'].forEach(attr => {
        if (node.hasAttribute && node.hasAttribute(attr)) {
          // 双重锁死：绝对不翻译任何输入框或编辑区的用户 value 属性
          if (attr === 'value' && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
            return;
          }
          const original = node.getAttribute(attr);
          if (original && (node.tagName !== 'INPUT' || node.type === 'button' || node.type === 'submit' || attr !== 'value')) {
            const translated = translateString(original);
            if (original !== translated) {
              node.setAttribute(attr, translated);
            }
          }
        }
      });
      if (node.shadowRoot) {
        translateNode(node.shadowRoot);
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i]);
      }
    } else if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        translateNode(node.childNodes[i]);
      }
    }
  }

  const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['placeholder', 'title', 'aria-label', 'value']
  };

  const observers = [];

  function observeRoot(root) {
    const observer = new MutationObserver((mutations) => {
      observer.disconnect();
      try {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (!shouldSkipNode(node)) {
                translateNode(node);
              }
            });
          } else if (mutation.type === 'characterData') {
            const node = mutation.target;
            if (!shouldSkipNode(node)) {
              const original = node.nodeValue;
              const translated = translateString(original);
              if (original !== translated) {
                node.nodeValue = translated;
              }
            }
          } else if (mutation.type === 'attributes') {
            const target = mutation.target;
            if (!shouldSkipNode(target)) {
              const attrName = mutation.attributeName;
              if (attrName === 'value' && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
                continue;
              }
              const original = target.getAttribute(attrName);
              if (original) {
                const translated = translateString(original);
                if (original !== translated) {
                  target.setAttribute(attrName, translated);
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('Observer translation error:', e);
      }
      observer.observe(root, observerConfig);
    });
    observer.observe(root, observerConfig);
    observers.push(observer);
  }

  // Hook attachShadow
  const originalAttachShadow = Element.prototype.attachShadow;
  Element.prototype.attachShadow = function() {
    const shadowRoot = originalAttachShadow.apply(this, arguments);
    observeRoot(shadowRoot);
    return shadowRoot;
  };

  function startObserver() {
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', startObserver);
      return;
    }
    try {
      translateNode(document.body);
    } catch (e) {
      console.error('Translation error:', e);
    }
    observeRoot(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }


})();
