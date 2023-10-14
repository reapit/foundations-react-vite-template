import { createRoot } from 'react-dom/client'
import App from './core/app'

const run = async () => {
  try {
    const rootElement = document.querySelector('#root') || document.body

    if (rootElement) {
      console.log(import.meta.env)
      createRoot(rootElement).render(<App />)
    }
  } catch (error) {
    console.error('App Crashed', error)
  }
}

run()
