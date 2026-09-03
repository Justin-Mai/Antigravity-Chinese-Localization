const fs = require('fs');
const path = require('path');
const vm = require('vm');

const localizeSource = fs.readFileSync(path.join(__dirname, '..', 'localize.js'), 'utf-8');
const match = localizeSource.match(/const DOM_TRANSLATOR_INJECTION = `([\s\S]*?)`;/);

if (!match) {
  console.error('未匹配到 DOM_TRANSLATOR_INJECTION');
  process.exit(1);
}

const injectionCode = match[1]; // match[1] 本身就是模板字符串内的内容！

console.log('injectionCode 长度:', injectionCode.length);
try {
  new vm.Script(injectionCode);
  console.log('✅ injectionCode 语法完全合法 (Valid JavaScript)');
} catch (e) {
  console.error('❌ injectionCode 存在语法错误:', e.message);
}
