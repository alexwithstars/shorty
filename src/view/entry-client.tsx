import './index.css'
import { hydrateRoot } from 'react-dom/client'
import App from './App.js'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <App />
)
