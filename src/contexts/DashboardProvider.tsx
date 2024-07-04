import React, { ReactNode, createContext, useState } from 'react'
import { Order } from '../types/order'
import { Paging, ResponseError } from '../types/response'
import { Car } from '../types/car'

type DashboardContextType = {
  orders: Order[] | null
  setOrders: React.Dispatch<React.SetStateAction<Order[] | null>>
  ordersPage: Paging | null
  setOrdersPage: React.Dispatch<React.SetStateAction<Paging | null>>
  cars: Car[] | null
  setCars: React.Dispatch<React.SetStateAction<Car[] | null>>
  carsPage: Paging | null
  setCarsPage: React.Dispatch<React.SetStateAction<Paging | null>>
  carsNotFound: ResponseError | null
  setCarsNotFound: React.Dispatch<React.SetStateAction<ResponseError | null>>
  ordersNotFound: ResponseError | null
  setOrdersNotFound: React.Dispatch<React.SetStateAction<ResponseError | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  parseParams: (
    params: URLSearchParams,
    keys: string[]
  ) => { [key: string]: string }
  selectedCarId: string | null
  setSelectedCarId: React.Dispatch<React.SetStateAction<string | null>>
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [cars, setCars] = useState<Car[] | null>(null)
  const [ordersPage, setOrdersPage] = useState<Paging | null>(null)
  const [carsPage, setCarsPage] = useState<Paging | null>(null)
  const [carsNotFound, setCarsNotFound] = useState<ResponseError | null>(null)
  const [ordersNotFound, setOrdersNotFound] = useState<ResponseError | null>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null)

  const parseParams = (params: URLSearchParams, keys: string[]) => {
    const searchParams: { [key: string]: string } = {}
    params.forEach((value, key) => {
      if (keys.includes(key) && value.trim() !== '') {
        searchParams[key] = value.trim()
      }
    })
    return searchParams
  }

  return (
    <DashboardContext.Provider
      value={{
        orders,
        setOrders,
        cars,
        setCars,
        carsNotFound,
        setCarsNotFound,
        ordersNotFound,
        setOrdersNotFound,
        parseParams,
        isLoading,
        setIsLoading,
        ordersPage,
        setOrdersPage,
        carsPage,
        setCarsPage,
        selectedCarId,
        setSelectedCarId,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
