import { useFieldArray } from 'react-hook-form'
import useCarForm from '../hooks/useCarForm'
import { FiX } from 'react-icons/fi'
import { Car } from '../types/car'
import { useEffect } from 'react'

interface Props {
  car?: Car
}

const CarOptionsInput: React.FC<Props> = ({ car }) => {
  const { register, watch, control, measureTextWidth, setValue } = useCarForm()

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: 'options',
  })

  useEffect(() => {
    if (car && car.options) {
      setValue(
        'options',
        JSON.parse(car.options).map((option: string) => {
          return { option }
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [car])

  const optionsValues = watch('options', optionFields)

  return (
    <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
      <label
        className="inline-block w-full font-display text-xs font-light md:col-span-3"
        htmlFor="options"
      >
        Options
      </label>
      <div className="flex w-full flex-wrap gap-1 font-display text-xs font-light text-neutral-700 md:col-span-7">
        {optionFields.map((field, index) => {
          return (
            <span
              key={`${index}-${field.id}}`}
              className="flex items-center rounded-sm border border-neutral-300 px-3 py-2 hover:border-darkblue-900 focus:border-darkblue-700"
            >
              <input
                type="text"
                className="text-wrap outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500"
                key={field.id}
                {...register(`options.${index}.option` as const)}
                onChange={(e) => {
                  if (e.currentTarget.value !== '') {
                    e.currentTarget.style.width = `${measureTextWidth(e.currentTarget.value, '12px Rubik')}px`
                  } else {
                    e.currentTarget.style.width = '1em'
                  }
                }}
                style={{
                  width: `${optionsValues && optionsValues[index].option !== '' ? `${measureTextWidth(optionsValues[index].option, '12px Rubik')}px` : '1em'}`,
                }}
              />
              <FiX
                onClick={() => removeOption(index)}
                className="cursor-pointer hover:shadow-low"
              />
            </span>
          )
        })}
        <button
          id="options"
          className="rounded-sm border border-neutral-300 px-3 py-2 hover:border-darkblue-900 focus:border-darkblue-700"
          onClick={(e) => {
            e.preventDefault()
            const lastField = optionsValues![optionsValues!.length - 1]
            if (lastField && lastField.option.trim() === '') {
              return
            }
            appendOption({ option: '' })
          }}
        >
          Add Option
        </button>
      </div>
    </div>
  )
}

export default CarOptionsInput
