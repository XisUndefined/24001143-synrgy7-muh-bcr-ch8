import Breadcrumb from '../../components/Breadcrumb'
import RootLayout from '../../layouts/RootLayout'
import CarForm from '../../components/CarForm'
import api from '../../api/api'
import useAuth from '../../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarFormProvider from '../../contexts/CarFormProvider'

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

const NewCar = () => {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<Error | null>(null)
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
        options
          .filter((option) => {
            return option.option.trim() !== ''
          })
          .map((option) => {
            return option.option
          })
      )
    }
    if (specs) {
      reqBody.specs = JSON.stringify(
        specs
          .filter((spec) => {
            return spec.spec.trim() !== ''
          })
          .map((spec) => {
            return spec.spec
          })
      )
    }

    try {
      const resCar = await api.post(
        '/admin/cars',
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
        navigate('/admin/cars', {
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

  return (
    <RootLayout>
      <Breadcrumb />
      <section className="my-4 w-full">
        <h2 className="text-xl font-bold">Add New Car</h2>
        <CarFormProvider>
          <CarForm onSubmit={handleFormSubmit} error={error} />
        </CarFormProvider>
      </section>
    </RootLayout>
  )
}

export default NewCar
