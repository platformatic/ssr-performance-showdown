#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'
import render from '@riotjs/ssr'

export async function main (dev) {
  const server = Fastify()
  const root = import.meta.url

  await server.register(FastifyVite, {
    dev: dev || process.argv.includes('--dev'),
    root,
    createRenderFunction ({ Page }) {
      return () => {
        return { element: render('page', Page) }
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
