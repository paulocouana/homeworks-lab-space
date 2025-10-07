import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { i18nPromise } from './i18n/config'

// Wait for i18n to initialize before rendering
i18nPromise.then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
