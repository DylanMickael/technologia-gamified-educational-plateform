import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite' // ❌ Ligne supprimée
import path from 'path'

// Paramètre de base ajouté pour le déploiement sur GitHub Pages (le nom du dépôt)
const repoName = 'technologia-gamified-educational-plateform';

export default defineConfig({
  // 💡 L'ajout de 'base' est essentiel pour que les assets fonctionnent
  // si votre application React est servie à partir d'un sous-chemin (le nom du dépôt).
  base: `/${repoName}/`, 
  plugins: [
    react(),
    // tailwindcss() // ❌ Appel supprimé
  ],
  assetsInclude: ['**/*.ani'],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173 
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
