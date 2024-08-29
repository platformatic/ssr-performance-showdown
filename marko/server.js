#!/usr/bin/env node
import { fileURLToPath } from 'node:url'

export async function main() {
  if (process.env.NODE_ENV === "production") {
    // In production, return the bundled fastify server.
    return (await import("./dist/index.js")).server;
  } else {
    // In dev we'll start a Vite dev server in middleware mode,
    // and forward requests to our fastify server.
    const devServer = await (
      await import("vite")
    ).createServer({
      appType: "custom",
      server: { middlewareMode: true },
    });
    return devServer.middlewares.use(async (req, res, next) => {
      try {
        const { server } = await devServer.ssrLoadModule("./src/index.js");
        await server.ready();
        server.routing(req, res);
      } catch (err) {
        return next(err);
      }
    });
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = await main();
  await server.listen({ port: 3000 });
}
