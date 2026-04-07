import { cp, mkdir, readdir } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, "..")

const distDir = path.resolve(process.argv[2] ?? path.join(repoRoot, "site-app/dist"))
const siteDir = path.resolve(process.argv[3] ?? path.join(repoRoot, "site"))
const siteAssetsDir = path.join(siteDir, "assets")

await mkdir(siteDir, { recursive: true })
await mkdir(siteAssetsDir, { recursive: true })

for (const entry of await readdir(distDir, { withFileTypes: true })) {
  const sourcePath = path.join(distDir, entry.name)

  if (entry.name === "index.html") {
    await cp(sourcePath, path.join(siteDir, "index.html"), { force: true })
    continue
  }

  if (entry.name === "assets" && entry.isDirectory()) {
    for (const asset of await readdir(sourcePath, { withFileTypes: true })) {
      await cp(
        path.join(sourcePath, asset.name),
        path.join(siteAssetsDir, asset.name),
        { force: true, recursive: asset.isDirectory() },
      )
    }
    continue
  }

  await cp(sourcePath, path.join(siteDir, entry.name), {
    force: true,
    recursive: entry.isDirectory(),
  })
}
