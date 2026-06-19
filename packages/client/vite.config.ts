import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// FIXME: Read slideSourceDir from course configs at build time instead of hardcoding paths.
const courseRoot = path.resolve(__dirname, '../../../');

export default defineConfig({
  plugins: [
    react(),

    // Serve slide PDFs from course directories during dev
    {
      name: 'slide-pdf-server',
      configureServer(server) {
        const slideDirs = [
          path.join(courseRoot, '人工智能', '学期课件'),
          path.join(courseRoot, '计算机系统', '学期课件'),
        ].filter(d => {
          try { return fs.statSync(d).isDirectory(); } catch { return false; }
        });
        if (slideDirs.length === 0) return;
        server.middlewares.use('/slides', (req, res, next) => {
          const urlPath = decodeURIComponent(new URL(req.url || '', 'http://localhost').pathname);
          for (const dir of slideDirs) {
            const fp = path.join(dir, urlPath.replace(/^\/slides\//, ''));
            try {
              if (fs.statSync(fp).isFile()) {
                const ext = path.extname(fp).toLowerCase();
                const mime = { '.pdf': 'application/pdf', '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }[ext] || 'application/octet-stream';
                res.setHeader('Content-Type', mime);
                fs.createReadStream(fp).pipe(res);
                return;
              }
            } catch {}
          }
          next();
        });
        console.log('  \x1b[2m📄 Slides: ' + slideDirs.join(', ') + '\x1b[0m');
      },
    },
  ],
  base: '/LearnCourse/',
  server: {
    port: 5299,
    strictPort: true,
    fs: { allow: ['..', '../..', path.join(courseRoot, '人工智能', '学期课件'), path.join(courseRoot, '计算机系统', '学期课件')] },
  },
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps) => {
        return deps.filter(d => !d.includes('mermaid') && !d.includes('katex'));
      },
    },
  },
})
