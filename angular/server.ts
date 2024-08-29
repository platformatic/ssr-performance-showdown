import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import fastifyStatic from '@fastify/static';
import fastify, { FastifyInstance } from 'fastify';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

export function app(): FastifyInstance {
  const server = fastify();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.register(fastifyStatic, {
    root: browserDistFolder,
    maxAge: '1y',
    index: false,
    wildcard: false,
  });

  server.get('*', (req, res) => {
    const { protocol, url, hostname } = req;
    const baseUrl = protocol + '://' + hostname;

    return commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: baseUrl + url,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
        inlineCriticalCss: false,
      })
      .then((html) => {
        res.type('text/html');
        res.send(html);

        return res;
      })
      .catch(() => res);
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] ? parseInt(process.env['PORT'], 10) : 3000;
  const server = app();

  server.listen({ port: port }, () => {
    console.log(`Node Fastify server listening on http://localhost:${port}`);
  });
}

run();
