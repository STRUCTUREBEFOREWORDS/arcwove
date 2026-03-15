import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.tsx'
import { SitePreferencesProvider } from "./context/SitePreferences.tsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SitePreferencesProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </SitePreferencesProvider>
  </React.StrictMode>,
);
