import { ControllerRenderProps } from 'react-hook-form'
import { useDatePicker } from '../../hooks/useDatePicker'
import { FormValues } from './CarSearchForm'
import { useCustomerSearch } from '../../hooks/useCustomerSearch'

const CarSearchDatePickerSubmit = ({
  field,
}: {
  field: ControllerRenderProps<FormValues, 'date_range'>
}) => {
  const { errors } = useCustomerSearch()
  const { setShowDatePicker } = useDatePicker()
  return (
    <div className="flex gap-4">
      <p className="w-1/2 text-sm font-light leading-5">
        {errors.date_range?.message
          ? `${errors.date_range.message}`
          : 'Choose range date max in 7 days'}
      </p>
      <button
        className="w-1/2 rounded-sm bg-darkblue-700 text-center text-sm font-bold leading-5 text-neutral-100 disabled:bg-darkblue-100"
        disabled={!!errors.date_range?.message}
        onClick={() => {
          setShowDatePicker(false)
          field.onChange(field.value)
        }}
      >
        Pilih Tanggal
      </button>
    </div>
  )
}

export default CarSearchDatePickerSubmit
