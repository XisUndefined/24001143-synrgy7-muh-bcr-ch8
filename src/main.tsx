import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import './index.css'
import NavbarProvider from './contexts/NavbarProvider'
import Dashboard from './routes/Dashboard'
import Cars from './routes/Cars'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarProvider>
        <Routes>
          {/* <Route path="/" element={<RootLayout />} /> */}
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cars" element={<Cars />} />
          </Route>
        </Routes>
      </NavbarProvider>
    </BrowserRouter>
  </React.StrictMode>
)
