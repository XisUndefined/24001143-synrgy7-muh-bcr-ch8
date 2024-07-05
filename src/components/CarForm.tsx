import React, { useRef } from 'react'
import { SubmitHandler } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'
import { Car, CarFormType } from '../types/car'
import { ResponseError } from '../types/response'
import useCarForm from '../hooks/useCarForm'
import CarManufactureInput from './CarManufactureInput'
import CarModelInput from './CarModelInput'
import CarTransmissionInput from './CarTransmissionInput'
import CarPlateInput from './CarPlateInput'
import CarYearInput from './CarYearInput'
import CarDriverServiceInput from './CarDriverServiceInput'
import CarPriceInput from './CarPriceInput'
import CarCapacityInput from './CarCapacityInput'
import CarTypeInput from './CarTypeInput'
import CarCategoryInput from './CarCategoryInput'
import CarOptionsInput from './CarOptionsInput'
import CarSpecsInput from './CarSpecsInput'
import CarDescriptionInput from './CarDescriptionInput'
import Spinner from './Spinner'
interface FormProps {
  onSubmit: SubmitHandler<CarFormType>
  error: ResponseError | null
  car?: Car
}

const CarForm: React.FC<FormProps> = ({ onSubmit, error, car }) => {
  const submitRef = useRef<() => void>()
  const navigate = useNavigate()

  const { handleSubmit, isValid, isDirty, isSubmitting } = useCarForm()

  return (
    <div className="my-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-wrap gap-4 rounded-sm bg-neutral-100 p-4"
      >
        <CarManufactureInput car={car} />
        <CarModelInput car={car} />
        <CarTransmissionInput car={car} />
        <CarPlateInput car={car} />
        <CarYearInput car={car} />
        <CarDriverServiceInput car={car} />
        <CarPriceInput car={car} />
        <CarCapacityInput car={car} />
        <CarTypeInput car={car} />
        <CarCategoryInput car={car} />
        <CarOptionsInput car={car} />
        <CarSpecsInput car={car} />
        <CarDescriptionInput car={car} />
        <button
          type="submit"
          className="hidden"
          ref={(el) => {
            if (el) submitRef.current = handleSubmit(onSubmit)
          }}
        ></button>
      </form>
      {error && (
        <div className="mt-4 flex w-full rounded-md border border-danger bg-danger bg-opacity-10 px-4 py-3 text-xs font-light text-danger">
          <p>{error.message}</p>
        </div>
      )}
      <div className="mt-4 flex gap-4">
        <button
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
          className="rounded-sm border border-darkblue-700 bg-neutral-100 px-3 py-2 text-sm font-bold text-darkblue-700 hover:border-darkblue-900 hover:text-darkblue-900 active:border-darkblue-500 active:text-darkblue-500"
        >
          Cancel
        </button>
        <button
          className="rounded-sm bg-darkblue-700 px-3 py-2 text-sm font-bold text-neutral-100 hover:border-darkblue-900 hover:bg-darkblue-900 active:border-darkblue-500 active:bg-darkblue-500 disabled:bg-darkblue-100"
          onClick={(e) => {
            e.preventDefault()
            submitRef.current && submitRef.current()
          }}
          disabled={!isValid || !isDirty || isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex w-8 justify-center">
              <Spinner size="20px" borderSize="2px" />
            </span>
          ) : (
            'Save'
          )}
        </button>
      </div>
    </div>
  )
}

export default CarForm
