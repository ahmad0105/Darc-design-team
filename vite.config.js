import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: 'public',
  publicDir: resolve(__dirname, 'static'),
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://darc-cloud-backend.ahmad-hashmi-c.workers.dev',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'https://darc-cloud-backend.ahmad-hashmi-c.workers.dev',
        changeOrigin: true
      }
    }
  },
  esbuild: {
    legalComments: 'none',
    treeShaking: true
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2022',
    sourcemap: false,
    cssMinify: true,
    minify: 'esbuild',
    reportCompressedSize: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1200,
    modulePreload: {
      resolveDependencies(filename, deps) {
        // Exclude heavy deferred chunks from render-blocking initial modulepreload in <head>
        return deps.filter(dep => 
          !dep.includes('feature-settings') &&
          !dep.includes('feature-documents') &&
          !dep.includes('feature-reports') &&
          !dep.includes('core-dragdrop') &&
          !dep.includes('feature-workspace')
        );
      }
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('/features/reports/')) return 'feature-reports';
          if (id.includes('/features/documents/')) return 'feature-documents';
          if (id.includes('/features/auth/')) return 'feature-auth';
          if (id.includes('/core/realtime')) return 'core-realtime';
          if (id.includes('/core/dragdrop')) return 'core-dragdrop';
          if (id.includes('/features/settings/')) return 'feature-settings';
          if (id.includes('/features/projects/') || id.includes('/features/tasks/')) return 'feature-workspace';
        }
      }
    }
  }
});
