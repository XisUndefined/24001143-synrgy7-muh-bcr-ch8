import { useEffect, useRef } from 'react'
import { useCustomerSearch } from '../../hooks/useCustomerSearch'
import { useDatePicker } from '../../hooks/useDatePicker'
import { addDays, isAfter, isBefore, parse } from 'date-fns'
import { Controller } from 'react-hook-form'
import { FiCalendar } from 'react-icons/fi'
import CarSearchDatePickerNavigation from './CarSearchDatePickerNavigation'
import CarSearchDatePickerMonth from './CarSearchDatePickerMonth'
import CarSearchDatePickerSubmit from './CarSearchDatePickerSubmit'

const CarSearchDatePicker = () => {
  const { errors, control } = useCustomerSearch()
  const { showDatePicker, setShowDatePicker, setShowDropdown } = useDatePicker()

  const containerRef = useRef<HTMLDivElement>(null)

  const validateDateRange = (value: string) => {
    const today = new Date()
    const [start, finish] = value
      .split(' - ')
      .map((date) => parse(date, 'yyyy-MM-dd', new Date()))

    if (!value.split(' - ')[1]) {
      return 'Choose range date max in 7 days'
    }

    if (isBefore(start, today)) {
      console.log(start, today)
      return "Start date must be atleast 1 day after today's date"
    }

    if (isBefore(finish, start)) {
      return 'Finish rent date must not be before the start rent date'
    }

    if (isAfter(finish, addDays(start, 7))) {
      return 'Range date cannot be more than 7 days'
    }

    return true
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !(e.target as HTMLElement).classList.contains('month-option')
      ) {
        setShowDatePicker(false)
        setShowDropdown(false)
      }
    }
    window.addEventListener('click', handleClick)

    return () => window.removeEventListener('click', handleClick)
  }, [setShowDatePicker, setShowDropdown])

  return (
    <div
      ref={containerRef}
      className="relative z-[2] flex w-full flex-wrap gap-1 font-display text-xs md:col-span-1 lg:col-span-2"
    >
      <label htmlFor="date_range" className="w-full text-neutral-700">
        Tanggal
      </label>
      <Controller
        name="date_range"
        control={control}
        defaultValue=""
        rules={{ required: true, validate: validateDateRange }}
        render={({ field }) => (
          <>
            <div
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`flex w-full cursor-pointer items-center rounded-sm border px-3 py-2 text-neutral-500 ${errors.date_range ? 'border-danger' : 'border-neutral-300'}`}
            >
              <input
                {...field}
                type="text"
                id="date_range"
                placeholder="Pilih Tanggal"
                readOnly
                value={field.value !== undefined ? field.value : ''}
                className="w-full cursor-pointer select-none text-ellipsis focus:outline-none"
              />
              <FiCalendar />
            </div>
            {showDatePicker && (
              <div className="absolute top-14 flex w-[312px] flex-wrap gap-4 rounded-sm border bg-neutral-100 p-4 shadow-high md:right-0 md:w-full lg:left-0 lg:w-fit">
                <CarSearchDatePickerNavigation />
                <CarSearchDatePickerMonth field={field} />
                <CarSearchDatePickerSubmit field={field} />
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default CarSearchDatePicker
