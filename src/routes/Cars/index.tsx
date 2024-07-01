import { useLocation, useParams } from 'react-router-dom'
import useDashboard from '../../hooks/useDashboard'
import useAuth from '../../hooks/useAuth'
import { useEffect } from 'react'
import api from '../../api/api'
import Loading from '../../components/Loading'
import RootLayout from '../../layouts/RootLayout'
import Breadcrumb from '../../components/Breadcrumb'
import CarCards from './CarCards'

const Cars = () => {
  const location = useLocation()
  const { category } = useParams()
  const { setCars, setCarsPage, setCarsNotFound, setIsLoading, isLoading } =
    useDashboard()
  const { token } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        if (!isLoading) {
          setIsLoading(true)
        }
        const params: { [key: string]: string } = {}
        const searchParams = new URLSearchParams(location.search)
        searchParams.forEach((value, key) => {
          if (
            (key === 'q' ||
              key === 'page' ||
              key === 'size' ||
              key === 'sort') &&
            value.trim() !== ''
          ) {
            params[key] = value.trim()
          }
        })

        const query = new URLSearchParams(params).toString()
        console.log({ query })

        try {
          const carResponse = await api.get(
            category
              ? Object.keys(params).length > 0
                ? `/admin/cars/${category}?${query}`
                : `/admin/cars/${category}`
              : Object.keys(params).length > 0
                ? `/admin/cars?${query}`
                : '/admin/cars',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          const resCars = await carResponse.json()

          if (!carResponse.ok) {
            setCarsNotFound(resCars)
            setCarsPage(null)
            setCars(null)
          } else if (carResponse.ok) {
            setCars(resCars.data)
            setCarsPage(resCars.paging)
            setCarsNotFound(null)
          }
        } catch {
          setCars(null)
          setCarsPage(null)
          setCarsNotFound({
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
  }, [location])

  return isLoading ? (
    <Loading size="5vw" bgSize="100vh" />
  ) : (
    <RootLayout>
      <Breadcrumb />
      <CarCards />
    </RootLayout>
  )
}

export default Cars
