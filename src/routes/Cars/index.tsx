import { useLocation, useParams } from 'react-router-dom'
import useDashboard from '../../hooks/useDashboard'
import useAuth from '../../hooks/useAuth'
import { useEffect, useRef } from 'react'
import api from '../../api/api'
import Loading from '../../components/Loading'
import RootLayout from '../../layouts/RootLayout'
import Breadcrumb from '../../components/Breadcrumb'
import CarCards from './CarCards'

const Cars = () => {
  const location = useLocation()
  const { category } = useParams()
  const {
    setCars,
    setCarsPage,
    setCarsNotFound,
    setIsLoading,
    isLoading,
    selectedCarId,
    setSelectedCarId,
  } = useDashboard()
  const { token } = useAuth()
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        if (!isLoading) {
          setIsLoading(true)
        }
        const params: { [key: string]: string } = {}
        const searchParams = new URLSearchParams(location.search)
        searchParams.forEach((value, key) => {
          if (
            (key === 'q' ||
              key === 'page' ||
              key === 'size' ||
              key === 'sort') &&
            value.trim() !== ''
          ) {
            params[key] = value.trim()
          }
        })

        const query = new URLSearchParams(params).toString()
        console.log({ query })

        try {
          const carResponse = await api.get(
            category
              ? Object.keys(params).length > 0
                ? `/admin/cars/${category}?${query}`
                : `/admin/cars/${category}`
              : Object.keys(params).length > 0
                ? `/admin/cars?${query}`
                : '/admin/cars',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )

          const resCars = await carResponse.json()

          if (!carResponse.ok) {
            setCarsNotFound(resCars)
            setCarsPage(null)
            setCars(null)
          } else if (carResponse.ok) {
            setCars(resCars.data)
            setCarsPage(resCars.paging)
            setCarsNotFound(null)
          }
        } catch {
          setCars(null)
          setCarsPage(null)
          setCarsNotFound({
            status: 'error',
            message: 'Something went wrong!',
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (containerRef) {
        if (containerRef.current === e.target) {
          setSelectedCarId(null)
        }
      }
    }
    window.addEventListener('click', handleClick)

    fetchData()
    return () => window.removeEventListener('click', handleClick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return isLoading ? (
    <Loading size="5vw" bgSize="100vh" />
  ) : (
    <>
      {selectedCarId && (
        <div
          ref={containerRef}
          className="overlay z-[9999] flex items-center justify-center"
        >
          <div className="flex h-fit w-full max-w-96 flex-wrap items-center justify-center gap-6 rounded-md bg-neutral-100 px-8 py-6 shadow-low max-md:mx-6 sm:w-1/2">
            <img src="img/delete-car-modal-image.png" alt="delete-car-modal" />
            <div className="flex w-full flex-wrap gap-4 text-center">
              <p className="w-full text-base font-bold">Menghapus Data Mobil</p>
              <p className="w-full text-sm font-light">
                Setelah dihapus, data mobil tidak dapat dikembalikan, Yakin
                ingin menghapus?
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button className="min-w-20 rounded-sm bg-darkblue-700 px-3 py-2 text-sm font-bold text-neutral-100 hover:border-darkblue-900 hover:bg-darkblue-900 active:border-darkblue-500 active:bg-darkblue-500 disabled:bg-darkblue-100">
                Ya
              </button>
              <button
                className="min-w-20 rounded-sm border border-darkblue-700 bg-neutral-100 px-3 py-2 text-sm font-bold text-darkblue-700 hover:border-darkblue-900 hover:text-darkblue-900 active:border-darkblue-500 active:text-darkblue-500"
                onClick={(e) => {
                  e.preventDefault()
                  setSelectedCarId(null)
                }}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
      <RootLayout>
        <Breadcrumb />
        <CarCards />
      </RootLayout>
    </>
  )
}

export default Cars
