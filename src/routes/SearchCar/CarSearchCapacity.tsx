import { FiUsers } from 'react-icons/fi'
import { Controller } from 'react-hook-form'
import { useCustomerSearch } from '../../hooks/useCustomerSearch'

const CarSearchCapacity = () => {
  const { errors, control } = useCustomerSearch()

  return (
    <div className="relative flex w-full flex-wrap gap-1 font-display text-xs md:col-span-1 lg:col-span-2">
      <label htmlFor="capacity" className="w-full text-neutral-700">
        Jumlah Penumpang (optional)
      </label>
      <div
        className={`flex w-full cursor-pointer items-center rounded-sm border px-3 py-2 text-neutral-500 ${errors.capacity ? 'border-danger' : 'border-neutral-300'}`}
      >
        <Controller
          name="capacity"
          control={control}
          defaultValue={undefined}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              id="capacity"
              min={1}
              value={field.value !== undefined ? field.value : ''}
              placeholder="Jumlah Penumpang"
              className="number w-full cursor-pointer select-none focus:outline-none"
            />
          )}
        />
        <FiUsers />
      </div>
    </div>
  )
}

export default CarSearchCapacity
