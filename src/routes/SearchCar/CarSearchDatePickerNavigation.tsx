import { FiArrowLeft, FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useEffect, useRef } from 'react'
import { useDatePicker } from '../../hooks/useDatePicker'

const CarSearchDatePickerNavigation = () => {
  const {
    currentMonth,
    showDropdown,
    setShowDropdown,
    decrementMonth,
    incrementMonth,
    setCurrentMonth,
  } = useDatePicker()

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    window.addEventListener('click', handleClick)

    return () => window.removeEventListener('click', handleClick)
  }, [dropdownRef, setShowDropdown])

  const months: string[] = []

  for (let i = 0; i <= 12; i++) {
    months.push(
      `${new Date(new Date().getFullYear(), new Date().getMonth() + i).toLocaleString('default', { month: 'short' })} ${new Date(new Date().getFullYear(), new Date().getMonth() + i).getFullYear()}`
    )
  }

  return (
    <div ref={dropdownRef} className="relative flex h-6 w-full justify-between">
      <button
        className="group w-7"
        onClick={(e) => {
          e.preventDefault()
          decrementMonth()
        }}
        disabled={
          `${currentMonth.toLocaleString('default', { month: 'short' })} ${currentMonth.getFullYear()}` ===
          `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getFullYear()}`
        }
      >
        <FiArrowLeft className="h-full w-full group-disabled:stroke-neutral-300" />
      </button>
      <span
        className="flex items-center justify-center gap-2 text-sm"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}
        <FiChevronDown
          className={`origin-center transform duration-300 ease-in-out ${showDropdown ? 'rotate-180' : ''}`}
        />
      </span>
      {showDropdown && (
        <div className="scrollbar absolute left-1/4 top-8 z-[1] h-56 w-1/2 overflow-y-auto rounded-sm border border-neutral-300 bg-neutral-100 py-3 shadow-low">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => {
                setCurrentMonth((prev) => {
                  const monthDate = new Date(prev)
                  const diffMonths =
                    (new Date(month).getFullYear() - monthDate.getFullYear()) *
                      12 +
                    (new Date(month).getMonth() - monthDate.getMonth())
                  monthDate.setMonth(prev.getMonth() + diffMonths)
                  return monthDate
                })
                setShowDropdown(false)
              }}
              className={`month-option w-full px-3 py-2 text-start font-display text-base leading-5 ${`${currentMonth.toLocaleString('default', { month: 'short' })} ${currentMonth.getFullYear()}` === month ? 'bg-[#e8f6f1]' : ''}`}
            >
              {month}
            </button>
          ))}
        </div>
      )}
      <button
        className="group w-7"
        onClick={(e) => {
          e.preventDefault()
          incrementMonth()
        }}
        disabled={
          `${currentMonth.toLocaleString('default', { month: 'short' })} ${currentMonth.getFullYear()}` ===
          `${new Date(new Date().getFullYear() + 1, new Date().getMonth()).toLocaleString('default', { month: 'short' })} ${new Date(new Date().getFullYear() + 1, new Date().getMonth()).getFullYear()}`
        }
      >
        <FiArrowRight className="h-full w-full group-disabled:stroke-neutral-300" />
      </button>
    </div>
  )
}

export default CarSearchDatePickerNavigation
