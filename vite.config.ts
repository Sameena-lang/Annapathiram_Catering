import { defineConfig } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function videoAssetPlugin(isBuild: boolean) {
  const videoFileName = 'Christian marriage Mutton Biryani - Chennai #shorts #chennaifood.mp4'
  const videoPath = path.resolve(__dirname, 'src/assets', videoFileName)

  return {
    name: 'video-asset-plugin',
    resolveId(id: string) {
      if (id.includes('mutton-biryani') || id.includes('Christian marriage Mutton Biryani')) {
        return '\0virtual:mutton-biryani.mp4'
      }
    },
    load(id: string) {
      if (id === '\0virtual:mutton-biryani.mp4') {
        if (isBuild) {
          const fileData = fs.readFileSync(videoPath)
          const referenceId = this.emitFile({
            type: 'asset',
            name: 'mutton-biryani.mp4',
            source: fileData,
          })
          return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`
        }
        return `export default "/@video/mutton-biryani.mp4";`
      }
    },
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && (req.url.startsWith('/@video/mutton-biryani') || (req.url.startsWith('/@fs/') && req.url.includes('Christian%20marriage')))) {
          res.setHeader('Content-Type', 'video/mp4')
          fs.createReadStream(videoPath).pipe(res)
          return
        }
        next()
      })
    },
  }
}

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  return {
    plugins: [
      videoAssetPlugin(isBuild),
      figmaAssetResolver(),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv', '**/*.mp4'],
  }
})
