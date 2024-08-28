import { hydrate } from 'preact'
import { createApp } from './base.jsx'

hydrate(
  createApp(),
  document.getElementById('root')
)
