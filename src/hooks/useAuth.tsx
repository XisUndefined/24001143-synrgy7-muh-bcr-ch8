import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  const { isAuthenticated, user, login, logout, token } = context
  return { isAuthenticated, user, login, logout, token }
}

export default useAuth
