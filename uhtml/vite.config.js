import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const path = fileURLToPath(import.meta.url);
const root = resolve(dirname(path), 'client');

const plugins = [];

export default {
  root,
  plugins
};
