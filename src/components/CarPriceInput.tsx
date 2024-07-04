import { useEffect, useState } from 'react'
import useCarForm from '../hooks/useCarForm'
import { Car } from '../types/car'

interface Props {
  car?: Car
}

const CarPriceInput: React.FC<Props> = ({ car }) => {
  const [priceDisplay, setPriceDisplay] = useState<string>(
    car ? `${car.rent_per_day.toLocaleString()}` : ''
  )
  const { errors, register, setValue } = useCarForm()

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, '')
    const numericValue = parseInt(rawValue)

    if (!isNaN(numericValue)) {
      setValue('rent_per_day', numericValue, { shouldDirty: true })
      setPriceDisplay(numericValue.toLocaleString('id-ID'))
    } else {
      setPriceDisplay('')
    }
  }

  const handlePricePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = event.clipboardData.getData('Text')
    if (!/^\d+$/.test(pastedData)) {
      event.preventDefault()
    }
  }

  const handlePriceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isControlA = e.ctrlKey && e.key.toLowerCase() === 'a'
    const isNumericKey = /^[0-9]$/.test(e.key)
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight']

    if (!isNumericKey && !isControlA && !allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (car) {
      setValue('rent_per_day', car.rent_per_day)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car])

  return (
    <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
      <label
        className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
        htmlFor="rent_per_day"
      >
        Price
      </label>
      <span
        className={`flex w-full gap-1 rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.rent_per_day ? 'border-danger' : 'border-neutral-300'}`}
      >
        Rp.
        <input
          id="rent_per_day"
          {...register('rent_per_day', {
            required: 'Price is required',
          })}
          inputMode="numeric"
          className={`w-full outline-none placeholder:font-display placeholder:text-xs placeholder:font-light`}
          placeholder="200.000"
          value={priceDisplay}
          onChange={handlePriceChange}
          onPaste={handlePricePaste}
          onKeyDown={handlePriceKeyDown}
        />
      </span>
      {errors.rent_per_day && (
        <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
          {errors.rent_per_day.message}
        </p>
      )}
    </div>
  )
}

export default CarPriceInput
