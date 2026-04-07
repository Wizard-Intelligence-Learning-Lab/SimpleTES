import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isUserSite = repository?.endsWith(".github.io")
const base = repository && !isUserSite ? `/${repository}/` : "/"

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
