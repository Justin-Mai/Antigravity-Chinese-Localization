const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

// 1. 读取当前 localize.js 源码
const localizeSource = fs.readFileSync(path.join(__dirname, '..', 'localize.js'), 'utf-8');

// 2. 提取 DOM_TRANSLATOR_INJECTION 中的 translateString 函数
// 我们通过 vm 沙盒运行提取出来的 IIFE 代码并暴露出 translateString
function getTranslateStringFunction() {
  const match = localizeSource.match(/(const DOM_TRANSLATOR_INJECTION = `[\s\S]*?`;)/);
  if (!match) {
    throw new Error('未能在 localize.js 中找到 DOM_TRANSLATOR_INJECTION 定义');
  }
  const hostSandbox = { globalThis: {} };
  vm.createContext(hostSandbox);
  vm.runInContext(match[1].replace('const DOM_TRANSLATOR_INJECTION', 'globalThis.DOM_TRANSLATOR_INJECTION'), hostSandbox);
  let injectionCode = hostSandbox.globalThis.DOM_TRANSLATOR_INJECTION;
  
  // 在 IIFE 结尾处将 translateString 挂载到全局 globalThis
  injectionCode = injectionCode.replace(
    'if (document.readyState === \'loading\')',
    'globalThis.__test_translateString = translateString;\n  if (typeof document !== "undefined" && document.readyState === "loading")'
  );

  const sandbox = {
    globalThis: {},
    document: { body: null, readyState: 'loading', addEventListener: () => {} },
    Node: { TEXT_NODE: 3, ELEMENT_NODE: 1, DOCUMENT_FRAGMENT_NODE: 11 },
    Element: { prototype: {} },
    MutationObserver: class { observe() {} disconnect() {} },
    console: console
  };
  
  vm.createContext(sandbox);
  vm.runInContext(injectionCode, sandbox);
  return sandbox.globalThis.__test_translateString;
}

const translateString = getTranslateStringFunction();

// 3. 测试用例集
const testCases = [
  // --- 基础防护用例 ---
  // [Case 1: 文件名中包含 remove 单词，必须保持英文原样，绝不能翻译为 01-移除-...]
  {
    name: '文件名中的 remove 不能被误分词为 移除',
    input: '01-remove-dynamic-words-engine.md',
    expected: '01-remove-dynamic-words-engine.md'
  },
  // [Case 2: 文件名中包含 backup 单词，必须保持英文原样，绝不能翻译为 ...-备份-...]
  {
    name: '文件名中的 backup 不能被误分词为 备份',
    input: '03-verification-and-backup-safety-test.md',
    expected: '03-verification-and-backup-safety-test.md'
  },
  // [Case 3: 路径中的 docs 单词，必须保持英文原样，绝不能翻译为 grill-with-文档-zh]
  {
    name: '路径中的 docs 不能被误分词为 文档',
    input: 'grill-with-docs-zh/SKILL.md',
    expected: 'grill-with-docs-zh/SKILL.md'
  },
  // [Case 4: 对话正文/短语中的 Error 单词，必须保持英文原样，绝不能翻译为 错误]
  {
    name: '普通短语中的 Error 不能被强制分词替换',
    input: 'Fixing Npm Ebusy Error',
    expected: 'Fixing Npm Ebusy Error'
  },
  // [Case 5: Agent 动态运行日志 Worked for 5s，根据 ADR-0002 保持英文原样]
  {
    name: 'Worked for 5s 保持英文原样',
    input: 'Worked for 5s',
    expected: 'Worked for 5s'
  },
  // [Case 6: Agent 动态运行日志 Explored 1 file，保持英文原样]
  {
    name: 'Explored 1 file 保持英文原样',
    input: 'Explored 1 file',
    expected: 'Explored 1 file'
  },
  // [Case 7: 纯 UI 菜单词条 File，必须正常汉化为 文件]
  {
    name: 'UI 菜单 File 正常汉化为 文件',
    input: 'File',
    expected: '文件'
  },
  // [Case 8: 纯 UI 菜单词条 Settings，必须正常汉化为 设置]
  {
    name: 'UI 菜单 Settings 正常汉化为 设置',
    input: 'Settings',
    expected: '设置'
  },

  // --- Ticket 01: 单词级字典收紧与用户文件夹保护 ---
  {
    name: '单字 "Project" 必须保持英文原样（不能翻译为 "项目"）',
    input: 'Project',
    expected: 'Project'
  },
  {
    name: '单字 "project" 必须保持英文原样（不能翻译为 "项目"）',
    input: 'project',
    expected: 'project'
  },
  {
    name: '菜单项复数 "Projects" 正常汉化为 "项目"',
    input: 'Projects',
    expected: '项目'
  },
  {
    name: '复合短语 "Select Project" 汉化为 "选择项目"',
    input: 'Select Project',
    expected: '选择项目'
  },
  {
    name: '复合短语 "New Project" 汉化为 "新建项目"',
    input: 'New Project',
    expected: '新建项目'
  },
  {
    name: '复合短语 "Quick Start" 汉化为 "快速开始"',
    input: 'Quick Start',
    expected: '快速开始'
  },
  {
    name: '复合短语 "No Project" 汉化为 "不在项目中"',
    input: 'No Project',
    expected: '不在项目中'
  },

  // --- Ticket 03: 2.10.0 Models & Usage 页面汉化 ---
  {
    name: 'Models & Usage 标题汉化',
    input: 'Models & Usage',
    expected: '模型与用量'
  },
  {
    name: 'Models & Usage 副标题汉化',
    input: 'Manage your model quota and credits.',
    expected: '管理您的模型配额与额度。'
  },
  {
    name: 'Plan 汉化为 计划',
    input: 'Plan',
    expected: '计划'
  },
  {
    name: 'Google AI Ultra 升级文案汉化',
    input: 'You can upgrade to a Google AI Ultra plan to receive higher rate limits.',
    expected: '您可以升级到 Google AI Ultra 计划以获得更高额的使用速率限制。'
  },
  {
    name: 'Gemini Models 汉化为 Gemini 模型',
    input: 'Gemini Models',
    expected: 'Gemini 模型'
  },
  {
    name: 'Weekly Limit Remaining 汉化为 每周剩余限额',
    input: 'Weekly Limit Remaining',
    expected: '每周剩余限额'
  },
  {
    name: 'Five Hour Limit Remaining 汉化为 5 小时剩余限额',
    input: 'Five Hour Limit Remaining',
    expected: '5 小时剩余限额'
  },
  {
    name: 'Claude and GPT models 汉化为 Claude 与 GPT 模型',
    input: 'Claude and GPT models',
    expected: 'Claude 与 GPT 模型'
  },
  {
    name: '导航栏 Models 汉化为 模型',
    input: 'Models',
    expected: '模型'
  },

  // --- Ticket 03: 动态时间格式汉化 ---
  {
    name: '动态刷新时间句子汉化（天/小时）',
    input: 'You have used some of your weekly limit it will fully refresh in: 2 days 19 hours',
    expected: '您已使用了部分每周限额 它将在以下时间后完全刷新： 2 天 19 小时'
  },

  // --- Ticket 03: 2.10.0 应用设置与远程控制 (Remote Control) ---
  {
    name: 'Manage Antigravity app settings. 汉化',
    input: 'Manage Antigravity app settings.',
    expected: '管理 Antigravity 应用设置。'
  },
  {
    name: '后台常驻描述文案汉化',
    input: 'Keep the app accessible from the menu bar and running in the background when all windows are closed.',
    expected: '在关闭所有窗口后，保持应用在菜单栏中可访问并在后台运行。'
  },
  {
    name: 'Remote Control 汉化为 远程控制',
    input: 'Remote Control',
    expected: '远程控制'
  },
  {
    name: 'Enable Remote Control 汉化为 启用远程控制',
    input: 'Enable Remote Control',
    expected: '启用远程控制'
  },
  {
    name: 'Work with local agents from another device. 汉化',
    input: 'Work with local agents from another device.',
    expected: '在其他设备上与本地智能体协同工作。'
  },
  {
    name: 'Device Name 汉化为 设备名称',
    input: 'Device Name',
    expected: '设备名称'
  },
  {
    name: 'Scan the code to open this device in Remote Control, or copy link. 汉化',
    input: 'Scan the code to open this device in Remote Control, or copy link.',
    expected: '扫描二维码以在远程控制中打开此设备，或复制链接。'
  },

  // --- 2.10.0 通用设置页 (Execution & Queued Messages) ---
  {
    name: 'Configure agent execution, queued message delivery, and permissions. 汉化',
    input: 'Configure agent execution, queued message delivery, and permissions.',
    expected: '配置智能体执行、队列消息发送以及权限。'
  },
  {
    name: 'Execution 汉化为 执行',
    input: 'Execution',
    expected: '执行'
  },
  {
    name: 'Queued Messages 汉化为 队列消息',
    input: 'Queued Messages',
    expected: '队列消息'
  },
  {
    name: 'Configure when follow-up messages are sent. 汉化',
    input: 'Configure when follow-up messages are sent.',
    expected: '配置后续消息的发送时机。'
  },
  {
    name: 'Queue 汉化为 排队',
    input: 'Queue',
    expected: '排队'
  },
  {
    name: 'Send Immediately 汉化为 立即发送',
    input: 'Send Immediately',
    expected: '立即发送'
  },
  {
    name: 'Keyboard shortcuts 汉化为 键盘快捷键',
    input: 'Keyboard shortcuts',
    expected: '键盘快捷键'
  },
  {
    name: 'Turbo Mode 汉化为 Turbo 极速模式',
    input: 'Turbo Mode',
    expected: 'Turbo 极速模式'
  },
  {
    name: 'Learn more about Turbo mode 汉化',
    input: 'Learn more about Turbo mode',
    expected: '了解关于 Turbo 模式的更多信息'
  },

  // --- 浏览器设置分段文本补全 ---
  {
    name: 'Configure the browser subagent. It requires 汉化',
    input: 'Configure the browser subagent. It requires',
    expected: '配置浏览器子智能体。这需要'
  },
  {
    name: 'to be installed. 汉化',
    input: 'to be installed.',
    expected: '需要安装。'
  }
];

let failedCount = 0;
let passedCount = 0;
console.log('=== 开始执行 Ticket 01 & Ticket 03 TDD 单元测试 ===\n');

for (const tc of testCases) {
  const actual = translateString(tc.input);
  try {
    assert.strictEqual(actual, tc.expected);
    console.log(`[PASS] ${tc.name}`);
    passedCount++;
  } catch (err) {
    console.error(`[FAIL - RED] ${tc.name}`);
    console.error(`       输入: "${tc.input}"`);
    console.error(`       实际: "${actual}"`);
    console.error(`       期望: "${tc.expected}"\n`);
    failedCount++;
  }
}

console.log(`\n测试汇总: 通过: ${passedCount}, 失败: ${failedCount}, 总计: ${testCases.length}`);

if (failedCount > 0) {
  process.exit(1); // 触发 RED 状态
} else {
  process.exit(0);
}
