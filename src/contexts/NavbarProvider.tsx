import { ReactNode, createContext, useState } from 'react'

type NavbarContextType = {
  isNavActive: boolean
  handleNavActive: () => void
}

export const NavbarContext = createContext<NavbarContextType | null>(null)

const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isNavActive, setIsNavActive] = useState<boolean>(false)

  const handleNavActive = () => {
    setIsNavActive(!isNavActive)
  }

  return (
    <NavbarContext.Provider value={{ isNavActive, handleNavActive }}>
      {children}
    </NavbarContext.Provider>
  )
}

export default NavbarProvider
