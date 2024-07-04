import { SubmitHandler, useForm } from 'react-hook-form'
import useCustomerCar from '../../hooks/useCustomerCar'
import CustomerSearchProvider from '../../contexts/CustomerSearchProvider'
import CarSearchDriverService from './CarSearchDriverService'
import CarSearchDatePicker from './CarSearchDatePicker'
import CarSearchTime from './CarSearchTime'
import CarSearchCapacity from './CarSearchCapacity'
import DatePickerProvider from '../../contexts/DatePickerProvider'

export type FormValues = {
  driver_service: string
  date_range: string
  time: string
  capacity?: number
}

const CarSearchForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  })

  const { navigate } = useCustomerCar()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const [startRent, finishRent] = data.date_range.split(' - ')
    const startDateRent = `${startRent}T${data.time.replace('.', ':').replace(' WIB', '')}:00Z`
    const finishDateRent = `${finishRent}T${data.time.replace('.', ':').replace(' WIB', '')}:00Z`

    const query = new URLSearchParams({
      driver_service: (data.driver_service === 'Dengan Sopir').toString(),
      start_date: startDateRent,
      finish_date: finishDateRent,
      ...(data.capacity && { capacity: data.capacity.toString() }),
    })

    reset()
    navigate({
      pathname: '/search',
      search: `?${query.toString()}`,
    })
  }

  return (
    <>
      <div className="container relative z-10 mx-auto select-none md:-top-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 rounded-lg bg-neutral-100 p-6 shadow-high md:grid md:grid-cols-2 lg:mx-16 lg:grid-cols-9"
        >
          <CustomerSearchProvider errors={errors} control={control}>
            <CarSearchDriverService />
            <DatePickerProvider>
              <CarSearchDatePicker />
            </DatePickerProvider>
            <CarSearchTime />
            <CarSearchCapacity />
          </CustomerSearchProvider>
          <button
            type="submit"
            disabled={!isValid}
            className="h-[34px] w-full self-end text-nowrap rounded-sm bg-limegreen-700 px-3 py-2 text-xs font-bold text-neutral-100 disabled:bg-limegreen-100 md:col-span-2 lg:col-span-1 xl:text-sm"
          >
            Cari Mobil
          </button>
        </form>
      </div>
      {/* <DevTool control={control} /> */}
    </>
  )
}

export default CarSearchForm
