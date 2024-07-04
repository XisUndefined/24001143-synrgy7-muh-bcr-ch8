import { useContext } from 'react'
import {
  CustomerSearchContext,
  CustomerSearchContextType,
} from '../contexts/CustomerSearchProvider'

export const useCustomerSearch = () => {
  const context = useContext(CustomerSearchContext)
  const { errors, control } = context as CustomerSearchContextType
  return { errors, control }
}
