import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { LoginValues } from '../CustomerLogin/CustomerLoginForm'
import Spinner from '../../components/Spinner'

type SignupValues = LoginValues & {
  firstname: string
  lastname?: string
  avatar?: string
  confirmPassword: string
}

type ErrorResponse = {
  status: string
  message: string
}

const CustomerSignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupValues>({ mode: 'onChange' })
  const { login } = useAuth()
  const navigate = useNavigate()
  const [resErrors, setResErrors] = useState<ErrorResponse | null>(null)

  const validatePassword = (value: string): boolean | string => {
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number'
    } else if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter'
    } else if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter'
    } else if (!/[!@#$%^&*()_+\-={}:;'",.<>?\\|[\]]/.test(value)) {
      return 'Password must contain at least one special character'
    }
    return true
  }

  const validateEmail = (value: string): boolean | string => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email address'
    }
    return true
  }

  const onSubmit: SubmitHandler<SignupValues> = async (data) => {
    const reqBody = {
      firstname: data.firstname,
      ...(data.lastname && { lastname: data.lastname }),
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }
    const response = await api.post('/auth/signup', reqBody)
    const res = await response.json()
    if (!response.ok) {
      setResErrors(res)
    } else {
      setResErrors(null)
      login(res.data.token)
      navigate('/')
    }
  }

  const password = watch('password')

  return (
    <div className="mx-4 w-full md:mx-20 lg:mx-44">
      <h1 className="mb-8 text-2xl font-bold">Sign Up</h1>
      <form
        className="mt-8 flex flex-wrap gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-wrap gap-2">
          <label className="w-full text-sm leading-5" htmlFor="firstname">
            Firstname*
          </label>
          <div className="flex w-full flex-wrap gap-1">
            <input
              className={`w-full rounded-md border ${errors.firstname?.message ? 'border-danger' : 'border-neutral-900 border-opacity-10'} px-4 py-3 text-xs outline-none`}
              {...register('firstname', {
                required: { value: true, message: 'Firstname is required' },
              })}
              type="text"
              placeholder="John"
            />
            {errors.firstname?.message && (
              <p className="font-display text-xs leading-3 text-danger">
                {errors.firstname.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-2">
          <label className="w-full text-sm leading-5" htmlFor="lastname">
            Lastname
          </label>
          <div className="flex w-full flex-wrap gap-1">
            <input
              className="w-full rounded-md border border-neutral-900 border-opacity-10 px-4 py-3 text-xs outline-none"
              {...register('lastname')}
              type="text"
              placeholder="John"
            />
          </div>
        </div>

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
                  message: 'Password must be at least 8 characters',
                },
                validate: validatePassword,
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

        <div className="flex w-full flex-wrap gap-2">
          <label className="w-full text-sm leading-5" htmlFor="password">
            Confirm Password*
          </label>
          <div className="flex w-full flex-wrap gap-1">
            <input
              className={`w-full rounded-md border ${errors.confirmPassword?.message ? 'border-danger' : 'border-neutral-900 border-opacity-10'} px-4 py-3 text-xs outline-none`}
              {...register('confirmPassword', {
                required: true,
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword?.message && (
              <p className="font-display text-xs leading-3 text-danger">
                {errors.confirmPassword.message}
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
          className="my-8 flex w-full justify-center rounded-sm bg-darkblue-700 px-3 py-2 font-bold text-neutral-100 disabled:bg-darkblue-100"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? <Spinner size="24px" borderSize="2px" /> : 'Sign Up'}
        </button>
      </form>
      <p className="w-full text-center text-sm">
        Already have an account?{' '}
        <Link className="font-bold text-darkblue-700 underline" to={'/login'}>
          Sign In here
        </Link>
      </p>
    </div>
  )
}

export default CustomerSignupForm
