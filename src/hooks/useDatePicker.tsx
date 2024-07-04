import { useContext } from 'react'
import {
  DatePickerContext,
  DatePickerContextType,
} from '../contexts/DatePickerProvider'

export const useDatePicker = () => {
  const context = useContext(DatePickerContext)
  const {
    currentMonth,
    showDatePicker,
    showDropdown,
    incrementMonth,
    decrementMonth,
    setCurrentMonth,
    setShowDatePicker,
    setShowDropdown,
  } = context as DatePickerContextType
  return {
    currentMonth,
    showDatePicker,
    showDropdown,
    incrementMonth,
    decrementMonth,
    setCurrentMonth,
    setShowDatePicker,
    setShowDropdown,
  }
}
