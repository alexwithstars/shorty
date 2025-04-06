import { renderToString } from 'react-dom/server'
import App from './App.js'

export function render (_url: string): { html: string } {
  const html = renderToString(
    <App />
  )
  return { html }
}
