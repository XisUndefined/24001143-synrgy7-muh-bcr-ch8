import { useLocation } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import Loading from '../../components/Loading'
import useDashboard from '../../hooks/useDashboard'
import RootLayout from '../../layouts/RootLayout'
import OrderTable from './OrderTable'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'
import api from '../../api/api'
import CarTable from './CarTable'
// import { useEffect } from 'react'
// import api from '../../api/api'

const Dashboard = () => {
  const location = useLocation()
  const {
    setOrders,
    setCars,
    setOrdersPage,
    setCarsPage,
    setCarsNotFound,
    setOrdersNotFound,
    parseParams,
    setIsLoading,
    isLoading,
  } = useDashboard()
  const { token } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        if (!isLoading) {
          setIsLoading(true)
        }

        const searchParams = new URLSearchParams(location.search)
        const params = parseParams(searchParams)

        const query = new URLSearchParams(params).toString()

        try {
          const carResponse = await api.get(
            Object.keys(params).length > 0
              ? `/admin/cars?${query}`
              : '/admin/cars',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          const resCars = await carResponse.json()

          const orderResponse = await api.get(
            Object.keys(params).length > 0
              ? `/admin/order?${query}`
              : '/admin/order',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          const resOrders = await orderResponse!.json()

          if (!carResponse.ok) {
            setCarsNotFound(resCars)
            setCars(null)
          } else if (carResponse.ok) {
            setCars(resCars.data)
            setCarsPage(resCars.paging)
            setCarsNotFound(null)
          }
          if (!orderResponse.ok) {
            setOrdersNotFound(resOrders)
            setOrders(null)
          } else if (orderResponse.ok) {
            setOrders(resOrders.data)
            setOrdersPage(resOrders.paging)
            setOrdersNotFound(null)
          }
        } catch {
          setCars(null)
          setOrders(null)
        } finally {
          setIsLoading(false)
        }
      }
    }
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return isLoading ? (
    <Loading size="5vw" bgSize="100vh" />
  ) : (
    <RootLayout>
      <Breadcrumb />
      <OrderTable />
      <CarTable />
    </RootLayout>
  )
}

export default Dashboard
