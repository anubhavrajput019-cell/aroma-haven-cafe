import fs from 'fs';
import path from 'path';

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        findFiles(filePath, filter, fileList);
      }
    } else if (filter.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findFiles('./src', /\.(tsx?|jsx?|json)$/);
const urlRegex = /https:\/\/images\.unsplash\.com\/[^\s'"`,)]+/g;
const urls = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.add(match[0]);
  }
}

console.log(`Found ${urls.size} unique Unsplash URLs.`);

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 'ERROR', error: err.message };
  }
}

async function run() {
  const results = [];
  for (const url of Array.from(urls)) {
    const result = await checkUrl(url);
    results.push(result);
    console.log(`${result.status === 200 ? 'OK' : 'FAIL'} [${result.status}]: ${url}`);
  }
  const failed = results.filter(r => r.status !== 200);
  console.log(`\nSummary: ${results.length - failed.length} passed, ${failed.length} failed.`);
}

run();
