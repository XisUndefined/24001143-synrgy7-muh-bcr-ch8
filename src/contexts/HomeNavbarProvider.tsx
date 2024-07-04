import React, { ReactNode, createContext } from 'react'

export interface HomeNavbarContextType {
  isActive: boolean
  handleActive: () => void
}

export const HomeNavbarContext = createContext<
  HomeNavbarContextType | undefined
>(undefined)

const HomeNavbarProvider = ({
  children,
  isActive,
  setIsActive,
}: {
  children: ReactNode
  isActive: boolean
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const handleActive = () => {
    setIsActive(!isActive)
  }

  return (
    <HomeNavbarContext.Provider value={{ isActive, handleActive }}>
      {children}
    </HomeNavbarContext.Provider>
  )
}

export default HomeNavbarProvider
