// Importing React packages
import React from 'react'

import ReactDOM from 'react-dom/client'

// Importing Browser Router
import {BrowserRouter} from 'react-router-dom'

// Importing Global Styles
import './index.css'

// Importing Main App
import App from './App'

// Importing Context Providers
import {AuthProvider} from './context/AuthContext'

import {EventProvider} from './context/EventContext'

// ==========================================
// CREATING ROOT
// ==========================================

const root = ReactDOM.createRoot(document.getElementById('root'))

// ==========================================
// RENDERING APPLICATION
// ==========================================

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
