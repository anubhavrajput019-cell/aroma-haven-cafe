import { spawn } from 'child_process';

const routesToTest = [
  '/',
  '/menu',
  '/about',
  '/contact',
  '/cart',
  '/checkout',
  '/search',
  '/table/01',
  '/admin/login',
  '/admin/dashboard',
  '/api/menu',
  '/robots.txt',
  '/sitemap.xml',
];

async function runTest() {
  const PORT = 3010;
  console.log(`Starting Next.js server on port ${PORT}...`);

  const server = spawn('cmd.exe', ['/c', 'npx', 'next', 'start', '-p', String(PORT)], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  server.stdout.on('data', (d) => process.stdout.write(`[Server] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[Server Err] ${d}`));

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 4000));

  let passed = 0;
  let failed = 0;

  for (const route of routesToTest) {
    try {
      const res = await fetch(`http://localhost:${PORT}${route}`);
      const text = await res.text();
      const status = res.status;
      const isOk = status >= 200 && status < 400;
      console.log(`Testing ${route.padEnd(20)} -> Status: ${status} [${isOk ? 'PASS' : 'FAIL'}] (Length: ${text.length})`);
      if (isOk) passed++;
      else failed++;
    } catch (e) {
      console.log(`Testing ${route.padEnd(20)} -> Error: ${e.message} [FAIL]`);
      failed++;
    }
  }

  server.kill('SIGTERM');
  console.log(`\nQA Route Results: ${passed} passed, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

runTest();
