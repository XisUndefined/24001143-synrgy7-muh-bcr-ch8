import { useContext } from 'react'
import {
  HomeSliderContext,
  HomeSliderContextType,
} from '../contexts/HomeSliderProvider'

export const useHomeSlider = () => {
  const context = useContext(HomeSliderContext)
  const { length, index, goToNext, goToPrev } = context as HomeSliderContextType
  return { length, index, goToNext, goToPrev }
}
