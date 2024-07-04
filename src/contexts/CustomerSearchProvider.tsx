import { ReactNode, createContext } from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import { CarSearchFormType } from '../types/car'

export interface CustomerSearchContextType {
  errors: FieldErrors<CarSearchFormType>
  control: Control<CarSearchFormType>
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
