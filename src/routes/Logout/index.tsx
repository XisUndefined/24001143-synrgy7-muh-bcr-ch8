import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Logout = () => {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    if (user && user.role === 'customer') {
      navigate('/login')
    } else {
      navigate('/admin/login')
    }
  }, [logout, user, navigate])

  return null
}

export default Logout
