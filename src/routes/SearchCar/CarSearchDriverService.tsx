import { FiChevronDown } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useCustomerSearch } from '../../hooks/useCustomerSearch'

const CarSearchDriverService = () => {
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
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative z-[3] flex w-full flex-wrap gap-1 font-display text-xs md:col-span-1 lg:col-span-2"
    >
      <label htmlFor="driver_service" className="w-full text-neutral-700">
        Tipe Driver
      </label>
      <Controller
        name="driver_service"
        control={control}
        defaultValue=""
        rules={{ required: 'Driver service is required' }}
        render={({ field }) => (
          <>
            <div
              onClick={() => setDropdown(!dropdown)}
              className={`flex w-full cursor-pointer items-center rounded-sm border px-3 py-2 text-neutral-500 ${errors.driver_service ? 'border-danger' : 'border-neutral-300'}`}
            >
              <input
                {...field}
                type="text"
                id="driver_service"
                placeholder="Pilih Tipe Driver"
                className="w-full cursor-pointer select-none focus:outline-none"
                readOnly
              />
              <FiChevronDown
                className={`${dropdown ? 'rotate-180' : ''} origin-center transform duration-300 ease-in-out`}
              />
            </div>
            {dropdown && (
              <div className="absolute top-14 w-full rounded-sm border bg-neutral-100 shadow-low">
                <button
                  className="w-full p-3 text-start hover:bg-neutral-300"
                  onClick={() => {
                    field.onChange('Dengan Sopir')
                    setDropdown(!dropdown)
                  }}
                >
                  Dengan Sopir
                </button>
                <button
                  className="w-full p-3 text-start hover:bg-neutral-300"
                  onClick={() => {
                    field.onChange('Tanpa Sopir (Lepas Kunci)')
                    setDropdown(!dropdown)
                  }}
                >
                  Tanpa Sopir (Lepas Kunci)
                </button>
              </div>
            )}
          </>
        )}
      />
    </div>
  )
}

export default CarSearchDriverService
