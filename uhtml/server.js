#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import FastifyVite from '@fastify/vite';
import { render, html } from 'uhtml-ssr';

// This example is based on uhtml/dom which offers much more
// than just strings, which is this benchmark use case.
// With this it'd be 3K instead of 5K requests with autocannon.
// import uhtml from 'uhtml/ssr';
// const { document, render, html } = uhtml('...');

export async function main (dev) {
  const server = Fastify();

  await server.register(FastifyVite, {
    root: import.meta.url,
    dev: dev || process.argv.includes('--dev'),
    createRenderFunction ({ createApp }) {
      return () => ({
        // with uhtml/dom instead it'd be:
        // element: render(document.body, createApp(html)).innerHTML,
        element: render(String, createApp(html))
      });
    }
  });

  server.get('/', (_, reply) => reply.html())

  await server.vite.ready();
  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await main();
  await server.listen({ port: 3000 });
}
