import React, { useEffect } from 'react'
import ReactQuill from 'react-quill'
import useCarForm from '../hooks/useCarForm'
import { Car } from '../types/car'

interface Props {
  car?: Car
}

const CarDescriptionInput: React.FC<Props> = ({ car }) => {
  const { errors, register, setValue, trigger, watch } = useCarForm()

  const editorContent = watch('description')

  const onEditorStateChange = (editorState: string) => {
    setValue('description', editorState, { shouldDirty: true })
    trigger('description')
  }

  useEffect(() => {
    if (car) {
      setValue('description', car.description)
    }

    register('description', {
      required: { value: true, message: 'Description is required' },
      validate: (value: string) => {
        const textOnly = value.replace(/<[^>]*>/g, '').trim()
        return textOnly !== '' || 'Description is required'
      },
    })
    // console.clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, car])

  return (
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
  )
}

export default CarDescriptionInput
