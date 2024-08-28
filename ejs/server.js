#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import Fastify from 'fastify'
import fastifyView from '@fastify/view'
import ejs from 'ejs'

export async function main () {
  const server = Fastify()
  await server.register(fastifyView, {
    engine: { ejs },
    root: 'client',
    layout: 'index.ejs',
  })

  server.get('/', (req, reply) => {
    const wrapperWidth = 960
    const wrapperHeight = 720
    const cellSize = 10
    const centerX = wrapperWidth / 2
    const centerY = wrapperHeight / 2

    let idCounter = 0
    let angle = 0
    let radius = 0

    const tiles = []
    const step = cellSize

    let x
    let y
    while (radius < Math.min(wrapperWidth, wrapperHeight) / 2) {
      x = centerX + Math.cos(angle) * radius
      y = centerY + Math.sin(angle) * radius

      if (x >= 0 && x <= wrapperWidth - cellSize && y >= 0 && y <= wrapperHeight - cellSize) {
        tiles.push({ x, y, id: idCounter++ })
      }

      angle += 0.2
      radius += step * 0.015
    }

    return reply.view('spiral.ejs', { tiles })
  })

  return server
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await main()
  await server.listen({ port: 3000 })
}
