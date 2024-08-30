import { render, html } from 'uhtml';
import { createApp } from './base.js';

render(
  document.getElementById('root'),
  createApp(html)
);
