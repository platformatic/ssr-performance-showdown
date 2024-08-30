# SSR Performance Showdown

This is a simple project to compare the performance of different SSR frameworks.

## Prerequisites

1. pnpm ([https://pnpm.io](https://pnpm.io))

1. autocannon ([https://github.com/mcollina/autocannon](https://github.com/mcollina/autocannon))

## Usage

0. Clone this repo:
   ```
   git clone https://github.com/platformatic/ssr-performance-showdown
   cd ssr-performance-showdown
   ```

1. Go to "fastify-html" directory:
   ```
   cd fastify-html
   ```

1. Install packages:
   ```
   pnpm install
   ```

1. Start server:
   ```
   pnpm start
   ```
   Make sure to change the port in `server.js` file if port 3000 is already in use.

1. Run benchmark:
   ```
   autocannon http://localhost:3000
   ```

1. Repeat the above process in the framework directory of your choice


## License

Apache-2.0
