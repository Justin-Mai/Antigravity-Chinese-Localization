const fs = require('fs');
const path = require('path');

const asarPath = path.join(process.env.LOCALAPPDATA, 'Programs/antigravity/resources/app.asar');
const bakPath = path.join(process.env.LOCALAPPDATA, 'Programs/antigravity/resources/app.asar.bak');

console.log('=== 读取实际 app.asar 状态 ===');
if (fs.existsSync(asarPath)) {
  const buf = fs.readFileSync(asarPath);
  const str = buf.toString('utf-8', 0, Math.min(buf.length, 50000000));
  console.log('app.asar 是否包含 coreWords:', str.includes('const coreWords'));
  console.log('app.asar 是否包含 conversation-container:', str.includes('conversation-container'));
  console.log('app.asar 是否包含 Worked for (\\d+)s:', str.includes('Worked for (\\d+)s') || str.includes('已工作 $1 秒'));
  console.log('app.asar 是否包含 DOM_TRANSLATOR_INJECTION:', str.includes('DOM_TRANSLATOR_INJECTION') || str.includes('Antigravity 2.0 Chinese Localization Engine'));
}

if (fs.existsSync(bakPath)) {
  const bufBak = fs.readFileSync(bakPath);
  const strBak = bufBak.toString('utf-8', 0, Math.min(bufBak.length, 50000000));
  console.log('\n=== 读取 app.asar.bak 状态 ===');
  console.log('app.asar.bak 是否包含 DOM_TRANSLATOR_INJECTION:', strBak.includes('Antigravity 2.0 Chinese Localization Engine'));
  console.log('app.asar.bak 是否包含 coreWords:', strBak.includes('const coreWords'));
}
