import { hydrate } from 'svelte'
import Page from './page.svelte'

hydrate(Page, {
  target: document.getElementById('root'),
})
