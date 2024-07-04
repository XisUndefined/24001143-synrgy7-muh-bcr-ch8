import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import HomeNavToggle from './HomeNavToggle'
import HomeNavMenu from './HomeNavMenu'
import HomeNavbarProvider from '../../contexts/HomeNavbarProvider'

const HomeNavbar = () => {
  const [isActive, setIsActive] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOverlay = (e: MouseEvent) => {
      if (overlayRef.current && overlayRef.current === e.target) {
        setIsActive(false)
      }
    }

    const handleScroll = () => {
      setIsActive(false)
    }
    document.addEventListener('click', handleClickOverlay)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('click', handleClickOverlay)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className={`${isActive ? 'max-md:before:overlay' : ''}`}
    >
      <header className="fixed z-20 flex w-full justify-center bg-[#f1f3ff]">
        <div className="container flex justify-between px-4 py-6">
          <Link to="/" className="bg-darkblue-700 px-5 text-darkblue-700">
            logo
          </Link>
          <HomeNavbarProvider isActive={isActive} setIsActive={setIsActive}>
            <HomeNavToggle />
            <HomeNavMenu />
          </HomeNavbarProvider>
        </div>
      </header>
    </div>
  )
}

export default HomeNavbar
