export type Car = {
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

export type CarFormType = Omit<Car,'id' | 'created_by' | 'updated_by' | 'deleted_by' | 
  'image' | 'deleted_at' | 'created_at' | 'updated_at' | 'driver_service' |  'options' | 'specs' > & {
  driver_service: string
  options?: {
    option: string
  }[]
  specs?: {
    spec: string
  }[]
}

export type CarSearchFormType = {
  driver_service: string
  date_range: string
  time: string
  capacity?: number
}