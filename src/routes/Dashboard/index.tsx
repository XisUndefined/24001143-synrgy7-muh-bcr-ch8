import { useLocation } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import Loading from '../../components/Loading'
import useDashboard from '../../hooks/useDashboard'
import DashboardLayout from '../../layouts/DashboardLayout'
import OrderTable from './OrderTable'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'
import api from '../../api/api'
import CarTable from './CarTable'
import TableProvider from '../../contexts/TableProvider'

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
        const params = parseParams(searchParams, ['q'])

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
            setCarsPage(null)
            setCars(null)
          } else if (carResponse.ok) {
            setCars(resCars.data)
            setCarsPage(resCars.paging)
            setCarsNotFound(null)
          }
          if (!orderResponse.ok) {
            setOrdersNotFound(resOrders)
            setOrdersPage(null)
            setOrders(null)
          } else if (orderResponse.ok) {
            setOrders(resOrders.data)
            setOrdersPage(resOrders.paging)
            setOrdersNotFound(null)
          }
        } catch {
          setCars(null)
          setCarsPage(null)
          setCarsNotFound({
            status: 'error',
            message: 'Something went wrong!',
          })
          setOrders(null)
          setOrdersPage(null)
          setOrdersNotFound({
            status: 'error',
            message: 'Something went wrong!',
          })
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
    <DashboardLayout>
      <Breadcrumb />
      <TableProvider options={{ table: 'orders' }}>
        <OrderTable />
      </TableProvider>
      <TableProvider options={{ table: 'cars' }}>
        <CarTable />
      </TableProvider>
    </DashboardLayout>
  )
}

export default Dashboard
