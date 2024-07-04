import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import AuthLayout from '../../layouts/AuthLayout'
import CustomerLoginForm from './CustomerLoginForm'

const CustomerLogin = () => {
  const { isAuthenticated } = useAuth()

  return !isAuthenticated ? (
    <AuthLayout>
      <CustomerLoginForm />
    </AuthLayout>
  ) : (
    <Navigate to={'/'} replace={true} />
  )
}

export default CustomerLogin
