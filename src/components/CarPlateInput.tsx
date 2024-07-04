import React from 'react'
import useCarForm from '../hooks/useCarForm'
import { Car } from '../types/car'

interface Props {
  car?: Car
}

const CarPlateInput: React.FC<Props> = ({ car }) => {
  const { register, errors } = useCarForm()

  return (
    <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
      <label
        className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
        htmlFor="plate"
      >
        Plate
      </label>
      <input
        id="plate"
        {...register('plate', {
          required: 'Plate is required',
          pattern: {
            value:
              /^(A|B|D|F|T|Z|E|H|G|K|R|AB|AD|AE|AG|S|K|W|L|M|N|P|BL|BB|BK|BA|BM|BH|BG|BN|BE|BD|B|DA|KT|DB|DL|DM|DN|DT|DD|DC|DS|DE|DG|DH|EB|ED|EA|PA|PB)\s([0-9]{1,4})\s([A-Z]{1,3})$/,
            message: 'Invalid plate format',
          },
        })}
        defaultValue={car ? car.plate : ''}
        className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.plate ? 'border-danger' : 'border-neutral-300'}`}
        placeholder="B 7890 KDR"
      />
      {errors.plate && (
        <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
          {errors.plate.message}
        </p>
      )}
    </div>
  )
}

export default CarPlateInput
