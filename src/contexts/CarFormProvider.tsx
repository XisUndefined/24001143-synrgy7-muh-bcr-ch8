import {
  Control,
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form'
import { CarFormType } from '../types/car'
import { createContext, ReactNode } from 'react'

type CarFormContextType = {
  register: UseFormRegister<CarFormType>
  handleSubmit: UseFormHandleSubmit<CarFormType, undefined>
  errors: FieldErrors<CarFormType>
  isValid: boolean
  isDirty: boolean
  isSubmitting: boolean
  setValue: UseFormSetValue<CarFormType>
  trigger: UseFormTrigger<CarFormType>
  control: Control<CarFormType>
  watch: UseFormWatch<CarFormType>
  measureTextWidth: (text: string, font: string) => number
}

export const CarFormContext = createContext<CarFormContextType | null>(null)

const CarFormProvider = ({ children }: { children: ReactNode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    setValue,
    trigger,
    control,
    watch,
  } = useForm<CarFormType>({ mode: 'onBlur' })

  const measureTextWidth = (text: string, font: string) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      context.font = font
      return context.measureText(text).width
    }
    return 0
  }

  return (
    <CarFormContext.Provider
      value={{
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
      }}
    >
      {children}
    </CarFormContext.Provider>
  )
}

export default CarFormProvider
