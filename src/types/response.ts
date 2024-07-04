export type ResponseError = {
  status: string
  message: string
}

export type Paging = {
  page: number
  total_page: number
  size: number
}

export type AuthResponse = {
  token: string
  role: string
}