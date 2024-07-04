import React, { useState } from 'react'
import useCarForm from '../hooks/useCarForm'
import { FiChevronDown } from 'react-icons/fi'
import { Car } from '../types/car'

interface Props {
  car?: Car
}

const CarCategoryInput: React.FC<Props> = ({ car }) => {
  const [categoryDropdown, setCategoryDropdown] = useState<boolean>(false)
  const { errors, register, setValue, trigger } = useCarForm()

  return (
    <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
      <label
        className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
        htmlFor="category"
      >
        Category
      </label>
      <span className="relative w-full md:col-span-7">
        <button
          className={`flex w-full cursor-pointer select-none items-center rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 placeholder:font-display hover:border-darkblue-900 focus:border-darkblue-700 ${errors.category ? 'border-danger' : 'border-neutral-300'}`}
          onClick={(e) => {
            e.preventDefault()
            setCategoryDropdown(!categoryDropdown)
          }}
        >
          <input
            id="category"
            {...register('category', {
              required: 'Category is required',
              validate: (value) =>
                ['small', 'medium', 'large'].includes(value) ||
                'Invalid category',
            })}
            defaultValue={car ? car.category : ''}
            readOnly
            placeholder="Pilih Kategori"
            className="w-full cursor-pointer capitalize outline-none placeholder:text-xs placeholder:font-light placeholder:text-neutral-500"
          />
          <FiChevronDown
            className={`${categoryDropdown ? 'rotate-180' : ''} origin-center transition-transform duration-100 ease-in-out`}
          />
        </button>
        {categoryDropdown && (
          <div className="absolute left-0 top-10 w-full bg-neutral-100 font-display text-xs text-neutral-500 shadow-low">
            <button
              className="w-full p-3 text-start capitalize hover:bg-neutral-300"
              onClick={(e) => {
                e.preventDefault()
                setValue('category', 'small', { shouldDirty: true })
                setCategoryDropdown(false)
                trigger('category')
              }}
            >
              small
            </button>
            <button
              className="w-full p-3 text-start capitalize hover:bg-neutral-300"
              onClick={(e) => {
                e.preventDefault()
                setValue('category', 'medium', { shouldDirty: true })
                setCategoryDropdown(false)
                trigger('category')
              }}
            >
              medium
            </button>
            <button
              className="w-full p-3 text-start capitalize hover:bg-neutral-300"
              onClick={(e) => {
                e.preventDefault()
                setValue('category', 'large', { shouldDirty: true })
                setCategoryDropdown(false)
                trigger('category')
              }}
            >
              large
            </button>
          </div>
        )}
      </span>
      {errors.category && (
        <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
          {errors.category.message}
        </p>
      )}
    </div>
  )
}

export default CarCategoryInput
