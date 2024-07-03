import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { FiChevronDown, FiX } from 'react-icons/fi'
import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'
import { DevTool } from '@hookform/devtools'

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

interface FormProps {
  onSubmit: SubmitHandler<CarFormInputs>
  car?: Car
}

const measureTextWidth = (text: string, font: string) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (context) {
    context.font = font
    return context.measureText(text).width
  }
  return 0
}

const CarForm: React.FC<FormProps> = ({ onSubmit, car }) => {
  const [driverServiceDropdown, setDriverServiceDropdown] =
    useState<boolean>(false)
  const [categoryDropdown, setCategoryDropdown] = useState<boolean>(false)
  const [priceDisplay, setPriceDisplay] = useState<string>(
    car ? `${car.rent_per_day.toLocaleString()}` : ''
  )
  const submitRef = useRef<() => void>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    trigger,
    control,
    watch,
  } = useForm<CarFormInputs>({
    mode: 'onBlur',
    defaultValues: {
      manufacture: car ? car.manufacture : '',
      model: car ? car.model : '',
      transmission: car ? car.transmission : '',
      plate: car ? car.plate : '',
      year: car ? car.year : undefined,
      driver_service: car
        ? car.driver_service
          ? 'Dengan Sopir'
          : 'Tanpa Sopir'
        : '',
      rent_per_day: car ? car.rent_per_day : undefined,
      capacity: car ? car.capacity : undefined,
      type: car ? car.type : '',
      category: car ? car.category : '',
      options: car
        ? JSON.parse(car.options ? car.options : '[]').map((option: string) => {
            return {
              option,
            }
          })
        : [{ option: '' }],
      specs: car
        ? JSON.parse(car.specs ? car.specs : '[]').map((spec: string) => {
            return {
              spec,
            }
          })
        : [{ spec: '' }],
      description: car ? car.description : '',
    },
  })
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: 'options',
  })

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: 'specs',
  })

  const optionsValues = watch('options', optionFields)
  const specsValues = watch('specs', specFields)
  const editorContent = watch('description')

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
    register('description', {
      required: { value: true, message: 'Description is required' },
    })
  }, [register])

  const onEditorStateChange = (editorState: string) => {
    setValue('description', editorState, { shouldDirty: true })
  }

  return (
    <div className="my-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-wrap gap-4 rounded-sm bg-neutral-100 p-4"
      >
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="manufacture"
          >
            Manufacture
          </label>
          <input
            id="manufacture"
            {...register('manufacture', {
              required: 'Manufacture is required',
            })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.manufacture ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="Mercedes"
          />
          {errors.manufacture && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.manufacture.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="model"
          >
            Model
          </label>
          <input
            id="model"
            {...register('model', { required: 'Model is required' })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.model ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="S Class"
          />
          {errors.model && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.model.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="transmission"
          >
            Transmission
          </label>
          <input
            id="transmission"
            {...register('transmission', {
              required: 'Transmission is required',
            })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.transmission ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="Automatic"
          />
          {errors.transmission && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.transmission.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="plate"
          >
            Plate
          </label>
          <input
            id="plate"
            {...register('plate', {
              required: 'Plate is required',
              pattern: {
                value:
                  /^(A|B|D|F|T|Z|E|H|G|K|R|AB|AD|AE|AG|S|K|W|L|M|N|P|BL|BB|BK|BA|BM|BH|BG|BN|BE|BD|B|DA|KT|DB|DL|DM|DN|DT|DD|DC|DS|DE|DG|DH|EB|ED|EA|PA|PB)\s([0-9]{1,4})\s([A-Z]{1,3})$/,
                message: 'Invalid plate format',
              },
            })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.plate ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="B 7890 KDR"
          />
          {errors.plate && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.plate.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="year"
          >
            Year
          </label>
          <input
            id="year"
            type="number"
            {...register('year', {
              required: 'Year is required',
              min: { value: 1, message: 'Year must be positive number' },
            })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.year ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="2012"
            min={1}
          />
          {errors.year && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.year.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="driver_service"
          >
            Driver Service
          </label>
          <span className="relative w-full md:col-span-7">
            <button
              className={`flex w-full cursor-pointer select-none items-center rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 placeholder:font-display hover:border-darkblue-900 focus:border-darkblue-700 ${errors.driver_service ? 'border-danger' : 'border-neutral-300'}`}
              onClick={(e) => {
                e.preventDefault()
                setDriverServiceDropdown(!driverServiceDropdown)
              }}
            >
              <input
                id="driver_service"
                {...register('driver_service', {
                  required: 'Driver service is required',
                })}
                readOnly
                placeholder="Pilih Tipe Driver"
                className="w-full cursor-pointer outline-none placeholder:text-xs placeholder:font-light placeholder:text-neutral-500"
              />
              <FiChevronDown
                className={`${driverServiceDropdown ? 'rotate-180' : ''} origin-center transition-transform duration-100 ease-in-out`}
              />
            </button>
            {driverServiceDropdown && (
              <div className="absolute left-0 top-10 w-full bg-neutral-100 font-display text-xs text-neutral-500 shadow-low">
                <button
                  className="w-full p-3 text-start hover:bg-neutral-300"
                  onClick={(e) => {
                    e.preventDefault()
                    setValue('driver_service', 'Dengan Sopir', {
                      shouldDirty: true,
                    })
                    setDriverServiceDropdown(false)
                    trigger('driver_service')
                  }}
                >
                  Dengan Sopir
                </button>
                <button
                  className="w-full p-3 text-start hover:bg-neutral-300"
                  onClick={(e) => {
                    e.preventDefault()
                    setValue('driver_service', 'Tanpa Sopir', {
                      shouldDirty: true,
                    })
                    setDriverServiceDropdown(false)
                    trigger('driver_service')
                  }}
                >
                  Tanpa Sopir
                </button>
              </div>
            )}
          </span>
          {errors.driver_service && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.driver_service.message}
            </p>
          )}
        </div>
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

        {/* TODO: Image file upload */}

        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="capacity"
          >
            Capacity
          </label>
          <input
            id="capacity"
            type="number"
            {...register('capacity', {
              required: 'Capacity is required',
              min: { value: 1, message: 'Capacity must be positive number' },
            })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.capacity ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="4"
            min={1}
          />
          {errors.capacity && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.capacity.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="type"
          >
            Type
          </label>
          <input
            id="type"
            {...register('type', {
              required: 'Type is required',
            })}
            className={`w-full rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500 hover:border-darkblue-900 focus:border-darkblue-700 md:col-span-7 ${errors.type ? 'border-danger' : 'border-neutral-300'}`}
            placeholder="Sedan"
          />
          {errors.type && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.type.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="category"
          >
            Category
          </label>
          <span className="relative w-full md:col-span-7">
            <button
              className={`flex w-full cursor-pointer select-none items-center rounded-sm border px-3 py-2 font-display text-xs font-light text-neutral-700 placeholder:font-display hover:border-darkblue-900 focus:border-darkblue-700 ${errors.category ? 'border-danger' : 'border-neutral-300'}`}
              onClick={(e) => {
                e.preventDefault()
                setCategoryDropdown(!categoryDropdown)
              }}
            >
              <input
                id="category"
                {...register('category', {
                  required: 'Category is required',
                  validate: (value) =>
                    ['small', 'medium', 'large'].includes(value) ||
                    'Invalid category',
                })}
                readOnly
                placeholder="Pilih Kategori"
                className="w-full cursor-pointer capitalize outline-none placeholder:text-xs placeholder:font-light placeholder:text-neutral-500"
              />
              <FiChevronDown
                className={`${categoryDropdown ? 'rotate-180' : ''} origin-center transition-transform duration-100 ease-in-out`}
              />
            </button>
            {categoryDropdown && (
              <div className="absolute left-0 top-10 w-full bg-neutral-100 font-display text-xs text-neutral-500 shadow-low">
                <button
                  className="w-full p-3 text-start capitalize hover:bg-neutral-300"
                  onClick={(e) => {
                    e.preventDefault()
                    setValue('category', 'small', { shouldDirty: true })
                    setCategoryDropdown(false)
                    trigger('category')
                  }}
                >
                  small
                </button>
                <button
                  className="w-full p-3 text-start capitalize hover:bg-neutral-300"
                  onClick={(e) => {
                    e.preventDefault()
                    setValue('category', 'medium', { shouldDirty: true })
                    setCategoryDropdown(false)
                    trigger('category')
                  }}
                >
                  medium
                </button>
                <button
                  className="w-full p-3 text-start capitalize hover:bg-neutral-300"
                  onClick={(e) => {
                    e.preventDefault()
                    setValue('category', 'large', { shouldDirty: true })
                    setCategoryDropdown(false)
                    trigger('category')
                  }}
                >
                  large
                </button>
              </div>
            )}
          </span>
          {errors.category && (
            <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
              {errors.category.message}
            </p>
          )}
        </div>
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
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light md:col-span-3"
            htmlFor="specs"
          >
            Specs
          </label>
          <div className="flex w-full flex-wrap gap-1 font-display text-xs font-light text-neutral-700 md:col-span-7">
            {specFields.map((field, index) => {
              return (
                <span
                  key={`${index}-${field.id}}`}
                  className="flex items-center rounded-sm border border-neutral-300 px-3 py-2 hover:border-darkblue-900 focus:border-darkblue-700"
                >
                  <input
                    type="text"
                    className="text-wrap outline-none placeholder:font-display placeholder:text-xs placeholder:font-light placeholder:text-neutral-500"
                    key={field.id}
                    {...register(`specs.${index}.spec` as const)}
                    onChange={(e) => {
                      if (e.currentTarget.value !== '') {
                        e.currentTarget.style.width = `${measureTextWidth(e.currentTarget.value, '12px Rubik')}px`
                      } else {
                        e.currentTarget.style.width = '1em'
                      }
                    }}
                    style={{
                      width: `${specsValues && specsValues[index].spec !== '' ? `${measureTextWidth(specsValues[index].spec, '12px Rubik')}px` : '1em'}`,
                    }}
                  />
                  <FiX
                    onClick={() => removeSpec(index)}
                    className="cursor-pointer hover:shadow-low"
                  />
                </span>
              )
            })}
            <button
              id="specs"
              className="rounded-sm border border-neutral-300 px-3 py-2 hover:border-darkblue-900 focus:border-darkblue-700"
              onClick={(e) => {
                e.preventDefault()
                const lastField = specsValues![specsValues!.length - 1]
                if (lastField && lastField.spec.trim() === '') {
                  return
                }
                appendSpec({ spec: '' })
              }}
            >
              Add Spec
            </button>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center gap-1 md:grid md:grid-cols-12 md:grid-rows-[1fr_7fr_14px]">
          <label
            className="inline-block w-full font-display text-xs font-light after:text-danger after:content-['*'] md:col-span-3"
            htmlFor="description"
          >
            Description
          </label>
          <div className="h-full w-full md:col-span-7 md:row-span-2">
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={onEditorStateChange}
              className={`${errors.description ? 'border border-danger' : ''}`}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [
                    { align: '' },
                    { align: 'center' },
                    { align: 'right' },
                    { align: 'justify' },
                  ],
                  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
                ],
              }}
            />
            {errors.description && (
              <p className="font-display text-[10px] text-danger md:col-span-7 md:col-start-4">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="hidden"
          ref={(el) => {
            if (el) submitRef.current = handleSubmit(onSubmit)
          }}
        ></button>
      </form>
      <div className="mt-4 flex gap-4">
        <button
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
          className="rounded-sm border border-darkblue-700 bg-neutral-100 px-3 py-2 text-sm font-bold text-darkblue-700 hover:border-darkblue-900 hover:text-darkblue-900 active:border-darkblue-500 active:text-darkblue-500"
        >
          Cancel
        </button>
        <button
          className="rounded-sm bg-darkblue-700 px-3 py-2 text-sm font-bold text-neutral-100 hover:border-darkblue-900 hover:bg-darkblue-900 active:border-darkblue-500 active:bg-darkblue-500 disabled:bg-darkblue-100"
          onClick={(e) => {
            e.preventDefault()
            submitRef.current && submitRef.current()
          }}
          disabled={!isValid || !isDirty}
        >
          Save
        </button>
      </div>
      <DevTool control={control} />
    </div>
  )
}

export default CarForm
