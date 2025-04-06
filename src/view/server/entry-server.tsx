import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../App.js'

export async function render (): Promise<{ html: string, context: Record<string, unknown> }> {
  const context = {}
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
  return { html, context }
}
