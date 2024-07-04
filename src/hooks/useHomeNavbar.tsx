import { useContext } from 'react'
import {
  HomeNavbarContext,
  HomeNavbarContextType,
} from '../contexts/HomeNavbarProvider'

const useHomeNavbar = () => {
  const context = useContext(HomeNavbarContext)
  const { isActive, handleActive } = context as HomeNavbarContextType
  return { isActive, handleActive }
}

export default useHomeNavbar
