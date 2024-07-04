import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import api from '../../api/api'
import { useState } from 'react'

export type LoginValues = {
  email: string
  password: string
}

type ErrorResponse = {
  status: string
  message: string
}

const CustomerLoginForm = () => {
  const [resErrors, setResErrors] = useState<ErrorResponse | null>(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  const validateEmail = (value: string): boolean | string => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email address'
    }
    return true
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<LoginValues> = async (data) => {
    const { email, password } = data
    const response = await api.post('/auth/login', { email, password })
    const res = await response.json()
    if (!response.ok) {
      setResErrors(res)
    } else {
      setResErrors(null)
      login(res.data.token)
      navigate('/')
    }
  }

  return (
    <div className="mx-4 w-full md:mx-20 lg:mx-44">
      <h1 className="mb-8 text-2xl font-bold">Welcome Back!</h1>
      <form
        className="mt-8 flex flex-wrap gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-wrap gap-2">
          <label className="w-full text-sm leading-5" htmlFor="email">
            Email*
          </label>
          <div className="flex w-full flex-wrap gap-1">
            <input
              className={`w-full rounded-md border ${errors.email?.message ? 'border-danger' : 'border-neutral-900 border-opacity-10'} px-4 py-3 text-xs outline-none`}
              {...register('email', {
                required: true,
                validate: validateEmail,
              })}
              type="text"
              placeholder="Contoh: johndee@gmail.com"
            />
            {errors.email?.message && (
              <p className="font-display text-xs leading-3 text-danger">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-2">
          <label className="w-full text-sm leading-5" htmlFor="password">
            Password*
          </label>
          <div className="flex w-full flex-wrap gap-1">
            <input
              className={`w-full rounded-md border ${errors.password?.message ? 'border-danger' : 'border-neutral-900 border-opacity-10'} px-4 py-3 text-xs outline-none`}
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              placeholder="6+ karakter"
            />
            {errors.password?.message && (
              <p className="font-display text-xs leading-3 text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {!!resErrors && (
          <div className="flex w-full rounded-md border border-danger bg-danger bg-opacity-10 px-4 py-3 text-xs font-light text-danger">
            <p>{resErrors.message}</p>
          </div>
        )}

        <button
          className="my-8 w-full rounded-sm bg-darkblue-700 px-3 py-2 font-bold text-neutral-100 disabled:bg-darkblue-100"
          type="submit"
          disabled={!isValid}
        >
          Sign In
        </button>
      </form>
      <p className="w-full text-center text-sm">
        Don't have an account?{' '}
        <Link className="font-bold text-darkblue-700 underline" to={'/signup'}>
          Sign Up for free
        </Link>
      </p>
    </div>
  )
}

export default CustomerLoginForm
