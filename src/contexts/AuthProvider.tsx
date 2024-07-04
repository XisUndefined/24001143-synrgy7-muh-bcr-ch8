import { ReactNode, createContext, useEffect, useState } from 'react'
import api from '../api/api'
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from '../utils/AuthHelper'
import { UserProfile } from '../types/user'

export type AuthContextType = {
  isAuthenticated: boolean
  user: UserProfile | null
  login: (token: string) => void
  logout: () => Promise<Response>
  token: string | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getAuthToken())
  const [user, setUser] = useState<UserProfile | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  const fetchUserProfile = async () => {
    if (token) {
      try {
        const response = await api.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const res = await response.json()
        if (!response.ok) {
          if (response.status !== 500) {
            logout()
          } else {
            setUser(null)
            localStorage.removeItem('user')
          }
        } else {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
        }
      } catch {
        setUser(null)
        localStorage.removeItem('user')
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (token) {
          fetchUserProfile()
        }
      },
      // retrieve user profile data every 5 minutes
      5 * 60 * 1000
    )

    if (token && !user) {
      fetchUserProfile()
    }

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const login = (newToken: string) => {
    setAuthToken(newToken)
    setToken(newToken)
  }

  const logout = async () => {
    removeAuthToken()
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    return await api.post('/auth/logout', null, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!token, user, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
