import path from "path";
import fastify from "fastify";

export const server = fastify();

if (process.env.NODE_ENV === "production") {
  server.register(import("@fastify/static"), {
    root: path.resolve("dist/assets"),
    prefix: "/assets",
  });
}

import Template from "./template.marko";
server.register(import("@marko/fastify"));
server.get('/', (req, reply) => {
  return reply.marko(Template);
});
