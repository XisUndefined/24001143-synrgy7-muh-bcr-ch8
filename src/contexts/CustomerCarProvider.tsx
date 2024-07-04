import React, { ReactNode, createContext, useState } from 'react'
import {
  NavigateFunction,
  SetURLSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { Car } from '../types/car'
import { Paging } from '../types/response'

export interface CustomerCarContextType {
  resErrors: Record<string, string | string[]>[] | null
  setResErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | string[]>[] | null>
  >
  cars: Car[] | null
  setCars: React.Dispatch<React.SetStateAction<Car[] | null>>
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  page: Paging | null
  setPage: React.Dispatch<React.SetStateAction<Paging | null>>
  navigate: NavigateFunction
  goToNextPage: () => void
  goToPrevPage: () => void
  parseSearchParams: (params: URLSearchParams) => {
    [key: string]: string
  }
}

export const CustomerCarContext = createContext<CustomerCarContextType | null>(
  null
)

const CustomerCarProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Paging | null>(null)
  const [cars, setCars] = useState<Array<Car> | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [resErrors, setResErrors] = useState<
    Record<string, string | string[]>[] | null
  >(null)
  const navigate = useNavigate()

  const parseSearchParams = (params: URLSearchParams) => {
    const searchParams: { [key: string]: string } = {}
    params.forEach((value, key) => {
      if (key === 'driver_service' && (value === 'true' || value === 'false')) {
        searchParams[key] = value
      } else if (
        key === 'capacity' ||
        key === 'size' ||
        key === 'page' ||
        key === 'start_date' ||
        key === 'finish_date'
      ) {
        searchParams[key] = value
      } else if (key === 'sort') {
        const carKeys = [
          'driver_service',
          'rent_per_day',
          'driver_service',
          'capacity',
          'year',
        ]
        carKeys.forEach((carKey) => {
          if (value.trim().replace('+', '').includes(carKey)) {
            searchParams[key] = value.trim()
          }
        })
      }
    })
    return searchParams
  }

  const goToNextPage = () => {
    const searchParams = new URLSearchParams(location.search)
    const params = parseSearchParams(searchParams)
    const newSearchParams = new URLSearchParams({
      ...params,
      page: params.page ? `${Number(params.page) + 1}` : '2',
    })
    navigate({
      pathname: '/search',
      search: `?${newSearchParams.toString()}`,
    })
  }

  const goToPrevPage = () => {
    const searchParams = new URLSearchParams(location.search)
    const params = parseSearchParams(searchParams)
    const { page, ...rest } = params
    const newSearchParams = new URLSearchParams({
      ...rest,
      ...(Number(page) > 2 && { page: `${Number(page) - 1}` }),
    })
    navigate({
      pathname: '/search',
      search: `?${newSearchParams.toString()}`,
    })
  }

  return (
    <CustomerCarContext.Provider
      value={{
        page,
        setPage,
        cars,
        setCars,
        searchParams,
        setSearchParams,
        resErrors,
        setResErrors,
        navigate,
        goToNextPage,
        goToPrevPage,
        parseSearchParams,
      }}
    >
      {children}
    </CustomerCarContext.Provider>
  )
}

export default CustomerCarProvider
