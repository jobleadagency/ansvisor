import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appDir = path.resolve(__dirname, '..', 'web');
const port = process.env.PORT || process.env.CPANEL_PORT || '3000';
const host = process.env.HOST || '0.0.0.0';
const env = {
  ...process.env,
  PORT: port,
  HOST: host,
  HOSTNAME: host,
};

const child = spawn('npm', ['run', 'start', '--', '--hostname', host, '--port', port], {
  cwd: appDir,
  stdio: 'inherit',
  env,
});

const stop = () => {
  if (!child.killed) {
    child.kill('SIGTERM');
  }
};

process.on('SIGTERM', stop);
process.on('SIGINT', stop);
child.on('exit', (code, signal) => {
  if (signal) {
    process.exit(0);
  }
  process.exit(code ?? 0);
});
