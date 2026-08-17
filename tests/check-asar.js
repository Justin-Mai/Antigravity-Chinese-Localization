const fs = require('fs');
const path = require('path');
const asar = require(path.join(process.env.LOCALAPPDATA, 'npm-cache/_npx/4b0e2640fe917ac8/node_modules/@electron/asar'));

const asarPath = path.join(process.env.LOCALAPPDATA, 'Programs/antigravity/resources/app.asar');
const bakPath = path.join(process.env.LOCALAPPDATA, 'Programs/antigravity/resources/app.asar.bak');

console.log('--- 检查 app.asar ---');
if (fs.existsSync(asarPath)) {
  const content = asar.extractFile(asarPath, 'dist/preload.js').toString('utf-8');
  console.log('app.asar dist/preload.js 包含 coreWords:', content.includes('coreWords'));
  console.log('app.asar dist/preload.js 包含 shouldSkipNode:', content.includes('shouldSkipNode'));
  console.log('app.asar dist/preload.js 包含 conversation-container:', content.includes('conversation-container'));
} else {
  console.log('app.asar 不存在');
}

console.log('\n--- 检查 app.asar.bak ---');
if (fs.existsSync(bakPath)) {
  const bakContent = asar.extractFile(bakPath, 'dist/preload.js').toString('utf-8');
  console.log('app.asar.bak 是否已经被注入过汉化代码:', bakContent.includes('DOM_TRANSLATOR_INJECTION') || bakContent.includes('shouldSkipNode') || bakContent.includes('coreWords'));
} else {
  console.log('app.asar.bak 不存在');
}
