import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import LoginForm from './LoginForm'
import { useEffect, useState } from 'react'

const AdminLogin = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (location.state?.error) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [location.state])

  return !isAuthenticated ? (
    <main className="flex bg-darkblue-700">
      <div className="h-dvh w-0 overflow-hidden md:w-1/4 xl:w-3/5">
        <img
          className="h-full object-cover opacity-70"
          src="../img/auth-banner.png"
        />
      </div>
      <div className="relative flex h-dvh w-full items-center justify-center bg-neutral-100 md:w-3/4 xl:w-2/5">
        <LoginForm />
        <div
          className={`absolute -top-11 flex w-full ${showError ? 'translate-y-20' : '-translate-y-20'} transition-all ease-in-out`}
        >
          <p className="mx-4 w-full rounded-md border border-danger bg-danger bg-opacity-10 px-4 py-3 text-xs font-light text-danger md:mx-20 lg:mx-44 xl:mx-20">
            {location.state ? `${location.state.error}` : ''}
          </p>
        </div>
      </div>
    </main>
  ) : (
    <Navigate to={'/admin'} replace={true} />
  )
}

export default AdminLogin
