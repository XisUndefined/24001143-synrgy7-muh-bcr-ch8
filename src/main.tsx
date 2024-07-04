import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import NavbarProvider from './contexts/NavbarProvider'
import Dashboard from './routes/Dashboard'
import Cars from './routes/Cars'
import DashboardProvider from './contexts/DashboardProvider'
import AuthProvider from './contexts/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Logout from './routes/Logout'
import NewCar from './routes/NewCar'
import EditCar from './routes/EditCar'
import NotFound from './routes/NotFound'
import Home from './routes/Home'
import CustomerProtectedRoute from './components/CustomerProtectedRoute'
import AdminLogin from './routes/AdminLogin'
import CustomerLogin from './routes/CustomerLogin'
import CustomerSignup from './routes/CustomerSignup'
import SearchCar from './routes/SearchCar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <DashboardProvider>
        <NavbarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<CustomerProtectedRoute />}>
              <Route path="/search" element={<SearchCar />} />
            </Route>
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/cars" element={<Cars />} />
              <Route path="/admin/cars/category/:category" element={<Cars />} />
              <Route path="/admin/cars/create" element={<NewCar />} />
              <Route path="/admin/cars/:id" element={<EditCar />} />
              <Route path="/admin/logout" element={<Logout />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/signup" element={<CustomerSignup />} />
            <Route
              path="*"
              element={<Navigate to={'/not-found'} replace={true} />}
            />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </NavbarProvider>
      </DashboardProvider>
    </AuthProvider>
  </BrowserRouter>
  // <React.StrictMode>
  // </React.StrictMode>
)
