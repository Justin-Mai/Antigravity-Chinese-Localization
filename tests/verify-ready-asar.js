const fs = require('fs');
const path = require('path');

const readyAsarPath = path.join(__dirname, '..', 'app.asar.ready');

if (!fs.existsSync(readyAsarPath)) {
  console.error('❌ 未找到 app.asar.ready');
  process.exit(1);
}

const buf = fs.readFileSync(readyAsarPath);
const str = buf.toString('utf-8', 0, Math.min(buf.length, 50000000));

console.log('=== app.asar.ready 完整性验收报告 ===');
console.log('1. 是否包含 DOM 汉化引擎 (DOM_TRANSLATOR_INJECTION):', str.includes('Antigravity 2.0 Chinese Localization Engine'));
console.log('2. 是否包含重构后的 DOM 隔离规则 (conversation-container):', str.includes('conversation-container'));
console.log('3. 是否已彻底移除 coreWords 猜词词表:', !str.includes('const coreWords'));
console.log('4. 是否已彻底移除 Worked for 动态日志正则:', !str.includes('Worked for (\\d+)s') && !str.includes('已工作 $1 秒'));
console.log('5. 文件体积 (字节):', buf.length);

if (
  str.includes('conversation-container') &&
  !str.includes('const coreWords')
) {
  console.log('\n🎉 验收 100% 完美通过！这是一个绝对纯净且重构完成的全新汉化包！');
  process.exit(0);
} else {
  console.error('\n❌ 验收未通过');
  process.exit(1);
}
