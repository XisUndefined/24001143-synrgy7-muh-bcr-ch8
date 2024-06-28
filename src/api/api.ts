const config = {
  apiBaseUrl: 'https://legislative-sabra-xisundefined-292b3617.koyeb.app/api/v1',
}

interface FetchOptions extends RequestInit {
  headers?: HeadersInit
}

class Api {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request(endpoint: string, options: FetchOptions) {
    const url = `${this.baseUrl}${endpoint}`

    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    options.headers = {
      ...defaultHeaders,
      ...options.headers,
    }

    return await fetch(url, options)
  }

  public get(endpoint: string, options?: FetchOptions) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  public post<T>(endpoint: string, body?: T, options?: FetchOptions) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      ...(!!body && { body: JSON.stringify(body) }),
    })
  }

  public put<T>(endpoint: string, body: T, options?: FetchOptions) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  public patch<T>(endpoint: string, body: T, options?: FetchOptions) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    })
  }

  public delete(endpoint: string, options?: FetchOptions) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

const api = new Api(config.apiBaseUrl)

export default api
