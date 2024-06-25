import { useContext } from 'react'
import { NavbarContext } from '../contexts/NavbarProvider'

const useNavbar = () => {
  const context = useContext(NavbarContext)
  if (!context) {
    throw new Error('useNavbar must be used within an NavbarProvider')
  }
  const { isNavActive, handleNavActive } = context
  return { isNavActive, handleNavActive }
}

export default useNavbar
