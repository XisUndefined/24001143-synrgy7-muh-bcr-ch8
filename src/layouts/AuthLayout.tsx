import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex bg-darkblue-700">
      <div className="flex h-dvh w-full items-center justify-center bg-neutral-100 md:w-3/4 xl:w-1/2">
        {children}
      </div>
      <div className="relative h-dvh w-0 overflow-hidden md:w-1/4 xl:w-1/2">
        <h1 className="m-28 hidden font-display text-5xl text-neutral-100 opacity-70 xl:block">
          Binar Car Rental
        </h1>
        <img
          className="absolute left-28 top-60 hidden xl:block"
          src="img/auth-banner-customer.png"
        />
      </div>
    </main>
  )
}

export default AuthLayout
