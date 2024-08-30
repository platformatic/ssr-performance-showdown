import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import riot from 'rollup-plugin-riot'
import { ensureESMBuild } from '@fastify/vite/utils'

const path = fileURLToPath(import.meta.url)
const root = resolve(dirname(path), 'client')

const plugins = [
  riot(),
  ensureESMBuild()
]

export default {
  root,
  plugins
}
