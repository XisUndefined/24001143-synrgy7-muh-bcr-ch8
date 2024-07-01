import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import NavbarProvider from './contexts/NavbarProvider'
import Dashboard from './routes/Dashboard'
import Cars from './routes/Cars'
import DashboardProvider from './contexts/DashboardProvider'
import AuthProvider from './contexts/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './routes/Login'
import Logout from './routes/Logout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <DashboardProvider>
        <NavbarProvider>
          <Routes>
            {/* <Route path="/" element={<RootLayout />} /> */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/logout" element={<Logout />} />
              {/* <Route path="/" element={<RootLayout />}>
              </Route> */}
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </NavbarProvider>
      </DashboardProvider>
    </AuthProvider>
  </BrowserRouter>
  // <React.StrictMode>
  // </React.StrictMode>
)
