#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import { renderToString, generateHydrationScript } from 'solid-js/web'

export async function main (dev) {
  const server = Fastify()

  await server.register(FastifyVite, {
    root: import.meta.url,
    createRenderFunction ({ createApp }) {
      return () => {
        return {
          hydration: generateHydrationScript(),
          element: renderToString(createApp)
        }
      }
    }
  })

  server.get('/', (req, reply) => {
    return reply.html()
  })

  await server.vite.ready()
  return server
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await main()
  await server.listen({ port: 3000 })
}
