import { useEffect, useRef, useState } from 'react'
import { FiClock } from 'react-icons/fi'
import { Controller } from 'react-hook-form'
import { useCustomerSearch } from '../../hooks/useCustomerSearch'

const CarSearchTime = () => {
  const { errors, control } = useCustomerSearch()
  const [dropdown, setDropdown] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setDropdown(false)
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  })

  return (
    <div
      ref={containerRef}
      className="relative z-[1] flex w-full flex-wrap gap-1 font-display text-xs md:col-span-1 lg:col-span-2"
    >
      <label htmlFor="time" className="w-full text-neutral-700">
        Waktu Jemput/Ambil
      </label>
      <Controller
        name="time"
        control={control}
        defaultValue=""
        rules={{ required: 'Time is required' }}
        render={({ field }) => (
          <>
            <div
              onClick={() => setDropdown(!dropdown)}
              className={`flex w-full cursor-pointer items-center rounded-sm border px-3 py-2 text-neutral-500 ${errors.time ? 'border-danger' : 'border-neutral-300'}`}
            >
              <input
                {...field}
                type="text"
                id="time"
                placeholder="Pilih Waktu"
                className="w-full cursor-pointer select-none focus:outline-none"
                // value={value}
                readOnly
              />
              <FiClock />
            </div>
            {dropdown && (
              <div className="scrollbar absolute top-14 h-52 w-full overflow-y-auto rounded-sm border bg-neutral-100 shadow-low">
                {Array.from({ length: 24 }, (_, i) =>
                  i.toString().padStart(2, '0')
                ).map((num, index) => (
                  <button
                    key={index}
                    className="flex w-full justify-between p-3 text-start after:content-['WIB'] hover:bg-neutral-300"
                    onClick={() => {
                      field.onChange(`${num}.00 WIB`)
                      setDropdown(!dropdown)
                    }}
                  >
                    {`${num}.00`}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default CarSearchTime
