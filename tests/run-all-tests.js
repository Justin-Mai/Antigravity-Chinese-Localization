const { execSync } = require('child_process');
const path = require('path');

const tests = [
  'ticket-01-translation.test.js',
  'ticket-02-dom-skip.test.js',
  'ticket-03-workflow-safety.test.js'
];

console.log('================ 全套 TDD 回归测试套件 ================\n');

let allPassed = true;

for (const test of tests) {
  const testPath = path.join(__dirname, test);
  try {
    const output = execSync(`node "${testPath}"`, { encoding: 'utf-8' });
    console.log(output);
  } catch (e) {
    console.error(e.stdout || e.message);
    allPassed = false;
  }
}

if (!allPassed) {
  console.error('\n❌ 测试套件存在未通过用例！');
  process.exit(1);
} else {
  console.log('🎉 恭喜！全套 TDD 测试用例 100% 全部通过 (ALL GREEN)！');
  process.exit(0);
}
