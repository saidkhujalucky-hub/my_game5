import { defineConfig } from 'vite';

// Для обычного сайта (Render, Cloudflare Pages) base = '/'.
// Для GitHub Pages через Actions — вычисляем имя репозитория.
const repo = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const isProfileRepo = repo.toLowerCase().endsWith('.github.io');
const base = process.env.GITHUB_PAGES === 'true' && repo && !isProfileRepo ? `/${repo}/` : '/';

export default defineConfig({
  root: 'client',
  base,
  server: {
    port: 5173,
    host: '0.0.0.0',
    fs: { allow: ['..'] },
    proxy: {
      '/socket.io': { target: 'http://localhost:3001', ws: true }
    }
  },
  build: { outDir: '../dist', emptyOutDir: true },
  preview: { port: 4173 }
});
