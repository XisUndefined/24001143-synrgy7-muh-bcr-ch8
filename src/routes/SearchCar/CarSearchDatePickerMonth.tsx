import { useEffect, useState } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'
import { ControllerRenderProps } from 'react-hook-form'
import { FormValues } from './CarSearchForm'

const CarSearchDatePickerMonth = ({
  field,
}: {
  field: ControllerRenderProps<FormValues, 'date_range'>
}) => {
  const [monthArray, setMonthArray] = useState<Array<Array<number | null>>>([])
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [finishDate, setFinishDate] = useState<Date | null>(null)
  const { currentMonth } = useDatePicker()

  useEffect(() => {
    const generateMonthArray = () => {
      const weeks: (number | null)[][] = []
      const thisMonth = new Date(currentMonth)
      const lastDayOfMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        0
      ).getDate()
      const firstDayOfWeek = currentMonth.getDay()
      let week: (number | null)[] = new Array(7).fill(null)

      for (let i = 0; i < firstDayOfWeek; i++) {
        week[i] = null
      }

      let day = 1
      while (day <= lastDayOfMonth) {
        week[thisMonth.getDay()] = day
        if (thisMonth.getDay() === 6 || day === lastDayOfMonth) {
          weeks.push(week)
          week = new Array(7).fill(null)
        }
        day++
        thisMonth.setDate(thisMonth.getDate() + 1)
      }

      return weeks
    }

    setMonthArray(generateMonthArray())
  }, [currentMonth])

  const isToday = (day: number | null) => {
    if (!day) return false
    const today = new Date()
    return (
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      ).toLocaleDateString() === today.toLocaleDateString()
    )
  }

  const isSelected = (day: number | null) => {
    if (!day) return false
    return (
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      ).toLocaleDateString() === startDate?.toLocaleDateString() ||
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      ).toLocaleDateString() === finishDate?.toLocaleDateString()
    )
  }

  const isRightSideSelected = (day: number | null) => {
    if (!day || !startDate || !finishDate) return false
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    return date >= startDate && date < finishDate
  }

  const isLeftSideSelected = (day: number | null) => {
    if (!day || !startDate || !finishDate) return false
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    return date <= finishDate && date > startDate
  }

  const toISODate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
      .toISOString()
      .slice(0, 10)
  }

  const handleClick = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )

    if (!startDate && !finishDate && selectedDate > new Date()) {
      setStartDate(selectedDate)
      field.onChange(`${toISODate(selectedDate)} - `)
    }
    if (
      !finishDate &&
      startDate &&
      selectedDate > startDate &&
      selectedDate > new Date()
    ) {
      setFinishDate(selectedDate)
      field.onChange(`${toISODate(startDate)} - ${toISODate(selectedDate)}`)
    }
    if (
      !finishDate &&
      startDate &&
      selectedDate <= startDate &&
      selectedDate > new Date()
    ) {
      setStartDate(selectedDate)
      field.onChange(`${toISODate(selectedDate)} - `)
    }
    if (startDate && finishDate && selectedDate > new Date()) {
      setFinishDate(null)
      setStartDate(selectedDate)
      field.onChange(`${toISODate(selectedDate)} - `)
    }
  }

  return (
    <>
      <div className="flex w-full justify-between">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
          <span
            key={idx}
            className="flex h-10 w-10 items-center justify-center text-sm font-normal"
          >
            {day}
          </span>
        ))}
      </div>
      <div
        className={`grid ${monthArray.length === 6 ? 'grid-rows-6' : 'grid-rows-5'} w-full select-none grid-cols-7 place-items-center`}
      >
        {monthArray.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <div
              className="relative flex h-10 w-full items-center justify-center"
              key={`${weekIndex}-${dayIndex}`}
            >
              <span
                className={`h-9 w-full ${isLeftSideSelected(day!) ? 'bg-[#E8F6F1]' : ''}`}
              ></span>
              <span
                className={`h-9 w-full ${isRightSideSelected(day) ? 'bg-[#E8F6F1]' : ''}`}
              ></span>
              <button
                className={`absolute h-full w-10 rounded-full text-sm font-light ${isToday(day) ? 'border border-[#35b0a7]' : ''} ${isSelected(day) ? 'border border-[#35b0a7] bg-[#35b0a7]' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(day!)
                }}
                disabled={!day}
              >
                {day}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default CarSearchDatePickerMonth
