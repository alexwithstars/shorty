import fs from 'node:fs/promises'
import path from 'node:path'

const gitIgnore = await fs.readFile(path.join(process.cwd(), '.gitignore'), 'utf-8')
const gitIgnoreLines = gitIgnore.split('\n').filter(line => line.trim() !== '')
gitIgnoreLines.push('.git')

export default async function debug (): Promise<void> {
  console.log('Debugging...')

  console.log('Debugging env variables...')
  console.log(`Current environment: ${process.env.NODE_ENV ?? 'undefined'}`)
  console.log(`Current port: ${process.env.PORT ?? 'undefined'}`)
  console.log(`Current host: ${process.env.HOST ?? 'undefined'}`)

  console.log('Debugging file structure...')
  console.log(`Current working directory: ${process.cwd()}`)
  console.log('File structure:')
  await printTree(process.cwd())
}

async function printTree (dir: string, prefix = ''): Promise<void> {
  const isGitIgnored = gitIgnoreLines.some(line => dir.includes(line.trim()))
  if (isGitIgnored) {
    console.log(`${prefix}Ignored: ${dir}`)
    return
  }
  const files = await fs.readdir(dir)

  for (const [index, file] of files.entries()) {
    const filePath = path.join(dir, file)
    const isLast = index === files.length - 1
    const connector = isLast ? '└── ' : '├── '

    console.log(`${prefix}${connector}${file}`)

    if ((await fs.stat(filePath)).isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ')
      await printTree(filePath, newPrefix)
    }
  }
}
