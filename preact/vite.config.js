import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import vitePreact from '@preact/preset-vite'

const path = fileURLToPath(import.meta.url)
const root = resolve(dirname(path), 'client')

const plugins = [
  vitePreact()
]

export default {
  root,
  plugins
}
