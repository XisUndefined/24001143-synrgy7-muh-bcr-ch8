import { useContext } from 'react'
import { CarFormContext } from '../contexts/CarFormProvider'

const useCarForm = () => {
  const context = useContext(CarFormContext)
  if (!context) {
    throw new Error('useCarForm must be used within a CarFormProvider')
  }
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    setValue,
    trigger,
    watch,
    control,
    measureTextWidth,
  } = context

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    setValue,
    trigger,
    watch,
    control,
    measureTextWidth,
  }
}

export default useCarForm
