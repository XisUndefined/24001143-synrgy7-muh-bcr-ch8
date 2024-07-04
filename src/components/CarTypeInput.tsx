import React from 'react'
import useCarForm from '../hooks/useCarForm'
import { Car } from '../types/car'

interface Props {
  car?: Car
}

const CarTypeInput: React.FC<Props> = ({ car }) => {
  const { register, errors } = useCarForm()

  return (
    <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
      <label
        className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
        htmlFor="type"
      >
        Type
      </label>
      <input
        id="type"
        {...register('type', {
          required: 'Type is required',
        })}
        defaultValue={car ? car.type : ''}
        className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.type ? 'border-danger' : 'border-neutral-300'}`}
        placeholder="Sedan"
      />
      {errors.type && (
        <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
          {errors.type.message}
        </p>
      )}
    </div>
  )
}

export default CarTypeInput
