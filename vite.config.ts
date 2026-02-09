import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Désactiver la génération de service worker pour éviter les erreurs de cache
    serviceWorker: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les bibliothèques lourdes
          'vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'radix': ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-tooltip'],
          'lucide': ['lucide-react'],
          'tanstack': ['@tanstack/react-query'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
} as any));
