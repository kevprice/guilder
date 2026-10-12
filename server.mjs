import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || (process.env.RAILWAY_ENVIRONMENT ? '0.0.0.0' : '127.0.0.1');
http
  .createServer(async (req, res) => {
    try {
      const name = decodeURIComponent(req.url.split('?')[0]);
      const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
      if (!file.startsWith(root + path.sep)) throw Error();
      const body = await readFile(file);
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader(
        'Content-Type',
        {
          '.html': 'text/html',
          '.js': 'text/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.svg': 'image/svg+xml',
        }[path.extname(file)] || 'text/plain',
      );
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  })
  .listen(port, host, () => console.log(`The Bound House: http://${host}:${port}`));
