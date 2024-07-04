import React, { ReactNode, createContext } from 'react'

export interface HomeSliderContextType {
  length: number
  index: number
  goToNext: () => void
  goToPrev: () => void
}

export const HomeSliderContext = createContext<
  HomeSliderContextType | undefined
>(undefined)

const HomeSliderProvider = ({
  children,
  length,
  index,
  setIndex,
}: {
  children: ReactNode
  length: number
  index: number
  setIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  const goToNext = () => {
    setIndex((prev) => prev + 1)
  }

  const goToPrev = () => {
    setIndex((prev) => prev - 1)
  }

  return (
    <HomeSliderContext.Provider value={{ length, index, goToNext, goToPrev }}>
      {children}
    </HomeSliderContext.Provider>
  )
}

export default HomeSliderProvider
