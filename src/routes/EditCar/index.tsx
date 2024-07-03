import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import CarForm from '../../components/CarForm'
import RootLayout from '../../layouts/RootLayout'
import { useEffect, useState } from 'react'
import api from '../../api/api'
import useAuth from '../../hooks/useAuth'
import useDashboard from '../../hooks/useDashboard'
import Loading from '../../components/Loading'

type Car = {
  id: string
  created_by: string
  updated_by?: string
  deleted_by?: string
  manufacture: string
  model: string
  transmission: string
  plate: string
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

type CarFormInputs = {
  manufacture: string
  model: string
  transmission: string
  plate: string
  year: number
  driver_service: string
  rent_per_day: number
  capacity: number
  type: string
  category: string
  options?: {
    option: string
  }[]
  specs?: {
    spec: string
  }[]
  description: string
}

type CarReqBody = {
  manufacture: string
  model: string
  transmission: string
  plate: string
  year: number
  driver_service: boolean
  rent_per_day: number
  capacity: number
  type: string
  category: string
  options?: string
  specs?: string
  description: string
}

type Error = {
  status: string
  message: string
}

const EditCar = () => {
  const { id } = useParams()
  const location = useLocation()
  const { token } = useAuth()
  const navigate = useNavigate()
  const [car, setCar] = useState<Car | null>(
    location.state ? location.state.car : null
  )
  const [error, setError] = useState<Error | null>(null)
  const { isLoading, setIsLoading } = useDashboard()

  const handleFormSubmit = async (data: CarFormInputs) => {
    setError(null)
    const { driver_service, options, specs, ...rest } = data
    const reqBody: CarReqBody = {
      ...rest,
      driver_service: driver_service === 'Dengan Sopir',
    }
    reqBody.rent_per_day = Number(`${reqBody.rent_per_day}`.replace(/\./g, ''))
    reqBody.year = Number(`${reqBody.year}`)
    reqBody.capacity = Number(`${reqBody.capacity}`)
    if (options) {
      reqBody.options = JSON.stringify(
        options.map((option) => {
          return option.option
        })
      )
    }
    if (specs) {
      reqBody.specs = JSON.stringify(
        specs.map((spec) => {
          return spec.spec
        })
      )
    }

    try {
      const resCar = await api.patch(
        `/admin/cars/${id}`,
        {
          ...reqBody,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const response = await resCar.json()

      if (!resCar.ok) {
        setError(response)
      } else {
        navigate('/cars', {
          state: { success: 'Data Berhasil Disimpan' },
          replace: true,
        })
      }
    } catch {
      setError({
        status: 'error',
        message: 'Something Went Wrong',
      })
    }
  }

  useEffect(() => {
    const fetchCarData = async () => {
      if (!location.state) {
        if (!isLoading) {
          setIsLoading(true)
        }
        try {
          const carResponse = await api.get(`/admin/cars/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })

          const resCar = await carResponse.json()

          if (!carResponse.ok) {
            navigate('/cars', { state: { error: 'Car Data Not Found' } })
          } else {
            setCar(resCar.data)
          }
        } catch {
          navigate('/cars', { state: { error: 'Something went wrong!' } })
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }
    fetchCarData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return isLoading ? (
    <Loading size="5vw" bgSize="100vh" />
  ) : (
    <RootLayout>
      <Breadcrumb />
      <section className="my-4 w-full">
        <h2 className="text-xl font-bold">Edit Car</h2>
        <CarForm onSubmit={handleFormSubmit} error={error} car={car as Car} />
      </section>
    </RootLayout>
  )
}

export default EditCar
