import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated && user!.role === 'customer') {
    navigate('/not-found', { replace: true })
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={'/admin/login'} />
}

export default ProtectedRoute
