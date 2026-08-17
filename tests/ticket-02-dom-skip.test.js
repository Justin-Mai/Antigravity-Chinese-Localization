const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

// 1. 读取当前 localize.js 源码
const localizeSource = fs.readFileSync(path.join(__dirname, '..', 'localize.js'), 'utf-8');

// 2. 提取 DOM_TRANSLATOR_INJECTION 中的 shouldSkipNode 函数
function getShouldSkipNodeFunction() {
  const match = localizeSource.match(/(const DOM_TRANSLATOR_INJECTION = `[\s\S]*?`;)/);
  if (!match) {
    throw new Error('未能在 localize.js 中找到 DOM_TRANSLATOR_INJECTION 定义');
  }
  const hostSandbox = { globalThis: {} };
  vm.createContext(hostSandbox);
  vm.runInContext(match[1].replace('const DOM_TRANSLATOR_INJECTION', 'globalThis.DOM_TRANSLATOR_INJECTION'), hostSandbox);
  let injectionCode = hostSandbox.globalThis.DOM_TRANSLATOR_INJECTION;
  
  // 在 IIFE 结尾处挂载 shouldSkipNode 到 globalThis
  injectionCode = injectionCode.replace(
    'if (document.readyState === \'loading\')',
    'globalThis.__test_shouldSkipNode = shouldSkipNode;\n  if (typeof document !== "undefined" && document.readyState === "loading")'
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
  return sandbox.globalThis.__test_shouldSkipNode;
}

const shouldSkipNode = getShouldSkipNodeFunction();

// 3. Mock DOM 节点结构支持
class MockNode {
  constructor(nodeType, parentElement = null) {
    this.nodeType = nodeType;
    this.parentElement = parentElement;
  }
}

class MockElement extends MockNode {
  constructor(tagName, { className = '', attributes = {}, parentElement = null } = {}) {
    super(1, parentElement); // Node.ELEMENT_NODE = 1
    this.tagName = tagName.toUpperCase();
    this.className = className;
    this.attributes = { ...attributes };
    this.children = [];
  }

  get classList() {
    const classes = this.className ? this.className.split(/\s+/).filter(Boolean) : [];
    return {
      contains: (cls) => classes.includes(cls)
    };
  }

  getAttribute(name) {
    return this.attributes[name] !== undefined ? this.attributes[name] : null;
  }

  hasAttribute(name) {
    return this.attributes[name] !== undefined;
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }
}

class MockTextNode extends MockNode {
  constructor(text, parentElement = null) {
    super(3, parentElement); // Node.TEXT_NODE = 3
    this.nodeValue = text;
    this.textContent = text;
  }
}

// 4. Ticket 02 测试用例集
const testCases = [
  // [Case 1: 正常 UI 控件，不跳过，返回 false]
  {
    name: 'Case 1 (正常 UI 控件): <button class="btn-primary">Settings</button> -> shouldSkipNode 应返回 false',
    buildNode: () => {
      const button = new MockElement('button', { className: 'btn-primary' });
      const text = new MockTextNode('Settings', button);
      button.appendChild(text);
      return button;
    },
    expected: false
  },
  // [Case 2: 聊天容器，跳过，返回 true]
  {
    name: 'Case 2 (聊天容器): <div class="conversation-container"><span>File</span></div> 中的 span 节点 -> shouldSkipNode 应返回 true',
    buildNode: () => {
      const container = new MockElement('div', { className: 'conversation-container' });
      const span = new MockElement('span', { parentElement: container });
      container.appendChild(span);
      const text = new MockTextNode('File', span);
      span.appendChild(text);
      return span;
    },
    expected: true
  },
  // [Case 3: 消息 ID 属性，跳过，返回 true]
  {
    name: 'Case 3 (消息 ID 属性): <div data-message-id="msg-123"><p>Error</p></div> 中的 p 节点 -> shouldSkipNode 应返回 true',
    buildNode: () => {
      const msgDiv = new MockElement('div', { attributes: { 'data-message-id': 'msg-123' } });
      const p = new MockElement('p', { parentElement: msgDiv });
      msgDiv.appendChild(p);
      const text = new MockTextNode('Error', p);
      p.appendChild(text);
      return p;
    },
    expected: true
  },
  // [Case 4: Markdown Prose 渲染正文，跳过，返回 true]
  {
    name: 'Case 4 (Markdown Prose 渲染正文): <div class="prose"><div>File</div></div> 中的 div 节点 -> shouldSkipNode 应返回 true',
    buildNode: () => {
      const proseDiv = new MockElement('div', { className: 'prose' });
      const innerDiv = new MockElement('div', { parentElement: proseDiv });
      proseDiv.appendChild(innerDiv);
      const text = new MockTextNode('File', innerDiv);
      innerDiv.appendChild(text);
      return innerDiv;
    },
    expected: true
  },
  // [Case 5: 文件路径特征，跳过，返回 true]
  {
    name: 'Case 5 (文件路径特征): <span class="path-label">grill-with-docs-zh/SKILL.md</span> -> shouldSkipNode 应返回 true',
    buildNode: () => {
      const pathSpan = new MockElement('span', { className: 'path-label' });
      const text = new MockTextNode('grill-with-docs-zh/SKILL.md', pathSpan);
      pathSpan.appendChild(text);
      return pathSpan;
    },
    expected: true
  },
  // [Case 6: 动态思考与日志区域，跳过，返回 true]
  {
    name: 'Case 6 (动态思考与日志区域): <div class="thought-container"><span>Thought</span></div> 中的 span 节点 -> shouldSkipNode 应返回 true',
    buildNode: () => {
      const thoughtDiv = new MockElement('div', { className: 'thought-container' });
      const span = new MockElement('span', { parentElement: thoughtDiv });
      thoughtDiv.appendChild(span);
      const text = new MockTextNode('Thought', span);
      span.appendChild(text);
      return span;
    },
    expected: true
  }
];

let failedCount = 0;
let passedCount = 0;
console.log('=== 开始执行 Ticket 02 DOM 隔离 (shouldSkipNode) TDD 单元测试 ===\n');

for (const tc of testCases) {
  const node = tc.buildNode();
  const actual = shouldSkipNode(node);
  try {
    assert.strictEqual(actual, tc.expected);
    console.log(`[PASS] ${tc.name}`);
    passedCount++;
  } catch (err) {
    console.error(`[FAIL - RED] ${tc.name}`);
    console.error(`       实际返回: ${actual}`);
    console.error(`       期望返回: ${tc.expected}\n`);
    failedCount++;
  }
}

console.log(`\n测试汇总: 通过: ${passedCount}, 失败: ${failedCount}, 总计: ${testCases.length}`);

if (failedCount > 0) {
  process.exit(1); // 触发 RED 状态
} else {
  process.exit(0);
}
