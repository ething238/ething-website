import fs from 'node:fs/promises';
import path from 'node:path';
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';

const root = process.cwd();
const temporary = path.resolve(root, 'artifacts/ai-hiring-build');
const published = path.resolve(root, 'public/ai-hiring-assets');
if (!temporary.startsWith(path.join(root, 'artifacts') + path.sep) || !published.startsWith(path.join(root, 'public') + path.sep)) throw new Error('AI output directories must remain inside this checkout.');
await build({
  configFile: false, root, publicDir: path.join(root, 'public'), logLevel: 'warn',
  build: {
    outDir: temporary, emptyOutDir: true, copyPublicDir: false, manifest: true, target: 'es2020',
    rollupOptions: { input: path.join(root, 'src/ai-hiring-runtime.js'), output: { entryFileNames: 'ai-hiring-[hash].js', assetFileNames: 'ai-hiring-[hash][extname]' } },
  },
});
const manifest = JSON.parse(await fs.readFile(path.join(temporary, '.vite/manifest.json'), 'utf8'));
const entry = manifest['src/ai-hiring-runtime.js'];
if (!entry?.file || !entry.css?.length) throw new Error('The AI page needs one script and its stylesheet.');
await fs.mkdir(published, { recursive: true });
for (const name of await fs.readdir(published)) {
  if (/^ai-hiring-[\w-]+\.(?:js|css)$/.test(name)) await fs.unlink(path.join(published, name));
}
for (const name of [entry.file, ...entry.css]) await fs.copyFile(path.join(temporary, name), path.join(published, path.basename(name)));

const server = await createServer({ configFile: false, root, publicDir: false, plugins: [react()], server: { middlewareMode: true, hmr: false }, appType: 'custom' });
try {
  const { renderAiHiring } = await server.ssrLoadModule('/scripts/ai-hiring-prerender.jsx');
  let markup = renderAiHiring();
  const head = [];
  markup = markup.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*rel="(?:canonical|preload|alternate)"[^>]*>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, tag => { head.push(tag); return ''; });
  let template = await fs.readFile('index.html', 'utf8');
  // Retain the retired AI page's duplicate Google-tag-loader avoidance here.
  template = template.replace('mobile_application|ai_staff_augmentation', 'mobile_application|hire-ai-developers');
  template = template.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '').replace(/<meta\b[^>]*name="(?:description|robots)"[^>]*>/gi, '').replace(/<link\b[^>]*rel="(?:icon|apple-touch-icon)"[^>]*>/gi, '');
  template = template.replace(/https:\/\/fonts\.googleapis\.com\/css2\?[^\"]+/g, 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&amp;display=swap');
  template = template.replace(/<script\b[^>]*src="\/src\/main\.jsx"[^>]*><\/script>/, '');
  const styles = entry.css.map(file => `<link rel="stylesheet" href="/ai-hiring-assets/${path.basename(file)}"/>`).join('\n');
  const html = template.replace('</head>', `${head.join('\n')}\n<meta name="robots" content="index,follow"/>\n<link rel="icon" type="image/png" sizes="48x48" href="/ai-staff/optimized/favicon-48.png"/>\n${styles}\n<noscript><style>.ai-hero-copy,.ai-lead-card{animation:none!important}</style></noscript>\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace('</body>', `<script type="module" src="/ai-hiring-assets/${path.basename(entry.file)}"></script>\n</body>`);
  if ((html.match(/<h1\b/g) || []).length !== 1 || !html.includes('Hire AI Developers in India')) throw new Error('The complete AI page must be rendered into HTML.');
  await fs.mkdir('public/hire-ai-developers', { recursive: true });
  await fs.writeFile('public/hire-ai-developers/index.html', html.replace(/[\t ]+$/gm, ''));
  console.log(`Rendered lightweight AI Developers HTML with ${entry.file} and ${entry.css.join(', ')}.`);
} finally { await server.close(); }
