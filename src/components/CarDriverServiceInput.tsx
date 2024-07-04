import React, { useState } from 'react'
import useCarForm from '../hooks/useCarForm'
import { FiChevronDown } from 'react-icons/fi'
import { Car } from '../types/car'

interface Props {
  car?: Car
}

const CarDriverServiceInput: React.FC<Props> = ({ car }) => {
  const [driverServiceDropdown, setDriverServiceDropdown] =
    useState<boolean>(false)
  const { errors, register, setValue, trigger } = useCarForm()

  return (
    <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
      <label
        className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
        htmlFor="driver_service"
      >
        Driver Service
      </label>
      <span className="relative w-full md:col-span-7">
        <button
          className={`flex w-full cursor-pointer select-none items-center rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 placeholder:font-display hover:border-darkblue-900 focus:border-darkblue-700 ${errors.driver_service ? 'border-danger' : 'border-neutral-300'}`}
          onClick={(e) => {
            e.preventDefault()
            setDriverServiceDropdown(!driverServiceDropdown)
          }}
        >
          <input
            id="driver_service"
            {...register('driver_service', {
              required: 'Driver service is required',
            })}
            defaultValue={
              car ? (car.driver_service ? 'Dengan Sopir' : 'Tanpa Sopir') : ''
            }
            readOnly
            placeholder="Pilih Tipe Driver"
            className="w-full cursor-pointer outline-none placeholder:text-xs placeholder:font-light placeholder:text-neutral-500"
          />
          <FiChevronDown
            className={`${driverServiceDropdown ? 'rotate-180' : ''} origin-center transition-transform duration-100 ease-in-out`}
          />
        </button>
        {driverServiceDropdown && (
          <div className="absolute left-0 top-10 w-full bg-neutral-100 font-display text-xs text-neutral-500 shadow-low">
            <button
              className="w-full p-3 text-start hover:bg-neutral-300"
              onClick={(e) => {
                e.preventDefault()
                setValue('driver_service', 'Dengan Sopir', {
                  shouldDirty: true,
                })
                setDriverServiceDropdown(false)
                trigger('driver_service')
              }}
            >
              Dengan Sopir
            </button>
            <button
              className="w-full p-3 text-start hover:bg-neutral-300"
              onClick={(e) => {
                e.preventDefault()
                setValue('driver_service', 'Tanpa Sopir', {
                  shouldDirty: true,
                })
                setDriverServiceDropdown(false)
                trigger('driver_service')
              }}
            >
              Tanpa Sopir
            </button>
          </div>
        )}
      </span>
      {errors.driver_service && (
        <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
          {errors.driver_service.message}
        </p>
      )}
    </div>
  )
}

export default CarDriverServiceInput
