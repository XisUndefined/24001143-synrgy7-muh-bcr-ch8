import React, { ReactNode, createContext, useState } from 'react'

type Order = {
  id: string
  email: string
  car: string
  bank: string
  transfer_image?: string
  status: string
  price: number
  start_rent: string
  finish_rent: string
  created_at: string
  updated_at: string
}

type Car = {
  id: string
  created_by: string
  updated_by?: string
  deleted_by?: string
  manufacture: string
  model: string
  transmission: string
  year: number
  driver_service: boolean
  rent_per_day: number
  image?: string
  capacity: number
  type: string
  category: string
  options?: string
  specs?: string
  description: string
  deleted_at?: string
  created_at: string
  updated_at: string
}

type NotFound = {
  status: string
  message: string
}

type Paging = {
  page: number
  total_page: number
  size: number
}

type DashboardContextType = {
  orders: Order[] | null
  setOrders: React.Dispatch<React.SetStateAction<Order[] | null>>
  ordersPage: Paging | null
  setOrdersPage: React.Dispatch<React.SetStateAction<Paging | null>>
  cars: Car[] | null
  setCars: React.Dispatch<React.SetStateAction<Car[] | null>>
  carsPage: Paging | null
  setCarsPage: React.Dispatch<React.SetStateAction<Paging | null>>
  carsNotFound: NotFound | null
  setCarsNotFound: React.Dispatch<React.SetStateAction<NotFound | null>>
  ordersNotFound: NotFound | null
  setOrdersNotFound: React.Dispatch<React.SetStateAction<NotFound | null>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  parseParams: (params: URLSearchParams) => {
    [key: string]: string
  }
}

export const DashboardContext = createContext<DashboardContextType | null>(null)

const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [cars, setCars] = useState<Car[] | null>(null)
  const [ordersPage, setOrdersPage] = useState<Paging | null>(null)
  const [carsPage, setCarsPage] = useState<Paging | null>(null)
  const [carsNotFound, setCarsNotFound] = useState<NotFound | null>(null)
  const [ordersNotFound, setOrdersNotFound] = useState<NotFound | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const parseParams = (params: URLSearchParams) => {
    const searchParams: { [key: string]: string } = {}
    params.forEach((value, key) => {
      if (key === 'q' && value.trim() !== '') {
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
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider
