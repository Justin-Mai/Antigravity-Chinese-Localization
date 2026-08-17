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

// 3. T1 阶段测试用例集
const testCases = [
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
  }
];

let failedCount = 0;
let passedCount = 0;
console.log('=== 开始执行 Ticket 01 TDD 单元测试 ===\n');

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
