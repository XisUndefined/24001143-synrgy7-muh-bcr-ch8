import { ReactNode } from 'react'
import HomeFooter from '../components/HomeFooter'
import HomeNavbar from '../routes/Home/HomeNavbar'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HomeNavbar />
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow">{children}</main>
      </div>
      <HomeFooter />
    </>
  )
}

export default HomeLayout
