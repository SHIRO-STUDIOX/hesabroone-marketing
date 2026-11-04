import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const files = new Set(['index.html','style.css','app.js','calculator.js']);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const port = Number(process.env.PORT || 4173);
http.createServer(async (req,res) => {
  const name = new URL(req.url, 'http://localhost').pathname.split('/').pop() || 'index.html';
  if (!files.has(name)) { res.writeHead(404); res.end('Not found'); return; }
  try { const data = await readFile(join(root,name)); res.writeHead(200, {'Content-Type':types[extname(name)],'Cache-Control':'no-store'}); res.end(data); }
  catch { res.writeHead(500); res.end('Server error'); }
}).listen(port, '127.0.0.1', () => console.log(`Prototype: http://127.0.0.1:${port}`));
