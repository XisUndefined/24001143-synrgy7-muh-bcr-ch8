import { useContext } from 'react'
import { DashboardContext } from '../contexts/DashboardProvider'

const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within an DashboardProvider')
  }
  const {
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
  } = context
  return {
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
  }
}

export default useDashboard
