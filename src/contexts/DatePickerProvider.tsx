import React, { ReactNode, createContext, useState } from 'react'

export interface DatePickerContextType {
  currentMonth: Date
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  incrementMonth: () => void
  decrementMonth: () => void
  showDatePicker: boolean
  showDropdown: boolean
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

export const DatePickerContext = createContext<DatePickerContextType | null>(
  null
)

const DatePickerProvider = ({ children }: { children: ReactNode }) => {
  const getStartOfDay = () => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  }

  const [currentMonth, setCurrentMonth] = useState(getStartOfDay())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const incrementMonth = () => {
    setCurrentMonth((prev) => {
      const nextMonth = new Date(prev)
      nextMonth.setMonth(prev.getMonth() + 1)
      return nextMonth
    })
  }

  const decrementMonth = () => {
    setCurrentMonth((prev) => {
      const nextMonth = new Date(prev)
      nextMonth.setMonth(prev.getMonth() - 1)
      return nextMonth
    })
  }

  return (
    <DatePickerContext.Provider
      value={{
        currentMonth,
        setCurrentMonth,
        incrementMonth,
        decrementMonth,
        showDatePicker,
        setShowDatePicker,
        showDropdown,
        setShowDropdown,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider
