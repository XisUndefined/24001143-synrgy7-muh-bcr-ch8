import { ReactNode, createContext } from 'react'
import { Control, FieldErrors } from 'react-hook-form'

type FormValues = {
  driver_service: string
  date_range: string
  time: string
  capacity?: number
}

export interface CustomerSearchContextType {
  errors: FieldErrors<FormValues>
  control: Control<FormValues>
}

export const CustomerSearchContext = createContext<
  CustomerSearchContextType | undefined
>(undefined)

interface CustomerSearchProps extends CustomerSearchContextType {
  children: ReactNode
}

const CustomerSearchProvider = ({
  errors,
  control,
  children,
}: CustomerSearchProps) => {
  return (
    <CustomerSearchContext.Provider value={{ errors, control }}>
      {children}
    </CustomerSearchContext.Provider>
  )
}

export default CustomerSearchProvider
