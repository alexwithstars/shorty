import { rm } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

async function removePath (path: string): Promise<void> {
  try {
    await rm(path, { recursive: true })
    console.log(`Removed ${path}`)
  } catch (e) {
    console.error(`Error removing ${path}:`, e)
  }
}

const _dirname = dirname(fileURLToPath(import.meta.url))
const _path = join(_dirname, '..', 'dist')
const _path2 = join(_dirname, '..', '.vercel', 'output')

console.log('Cleaning up...')
await removePath(_path)
await removePath(_path2)
