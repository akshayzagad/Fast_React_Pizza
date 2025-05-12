import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/**
 * npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
 * npm install tailwindcss postcss autoprefixer
 * npx tailwindcss init
 * npm install -D prettier prettier-plugin-tailwindcss
 */