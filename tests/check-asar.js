const fs = require('fs');
const path = require('path');

function getAsarModule() {
  try {
    return require('@electron/asar');
  } catch (e) {
    // 尝试在全局 npm / npx 缓存中寻找可用 asar
    const npxCache = path.join(process.env.LOCALAPPDATA || '', 'npm-cache', '_npx');
    if (fs.existsSync(npxCache)) {
      const dirs = fs.readdirSync(npxCache);
      for (const dir of dirs) {
        const candidate = path.join(npxCache, dir, 'node_modules', '@electron', 'asar');
        if (fs.existsSync(candidate)) {
          try {
            return require(candidate);
          } catch (_) {}
        }
      }
    }
    return null;
  }
}

const asar = getAsarModule();
const asarPath = path.join(process.env.LOCALAPPDATA || '', 'Programs/antigravity/resources/app.asar');
const bakPath = path.join(process.env.LOCALAPPDATA || '', 'Programs/antigravity/resources/app.asar.bak');

if (!asar) {
  console.log('未检测到 @electron/asar 模块，自动跳过 asar 模块级别检查 (建议运行 npm i -g @electron/asar)。');
  process.exit(0);
}

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
