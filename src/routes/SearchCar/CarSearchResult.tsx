import { useEffect } from 'react'
import api from '../../api/api'
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiUsers,
} from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import useCustomerCar from '../../hooks/useCustomerCar'

const CarSearchResult = () => {
  const {
    parseSearchParams,
    setResErrors,
    setCars,
    setPage,
    resErrors,
    cars,
    page,
    goToNextPage,
    goToPrevPage,
  } = useCustomerCar()
  const location = useLocation()

  useEffect(() => {
    const fetchCars = async () => {
      const searchParams = new URLSearchParams(location.search)
      const params = parseSearchParams(searchParams)

      if (Object.keys(params).length > 0) {
        const query = searchParams.toString()
        const response = await api.get(`/cars/search?${query}`)

        const res = await response.json()

        if (!response.ok) {
          if (!res.errors) {
            setResErrors([{ message: res.message }])
          } else {
            setResErrors(res.errors)
          }
        } else {
          setCars(res.data)
          setPage(res.paging)
          setResErrors(null)
        }
      } else {
        setCars(null)
        setPage(null)
        setResErrors(null)
      }
    }
    fetchCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search])

  return (
    <>
      {!!cars && (
        <div className="container mx-auto my-12 md:mt-0">
          <div className="grid gap-6 px-6 sm:grid-cols-2 md:px-0 lg:mx-16 xl:grid-cols-3">
            {cars.map((car, id) => (
              <section
                key={id}
                className="h-[570px] rounded-lg border bg-neutral-100 shadow-low"
              >
                <img
                  src={`${car.image ? car.image : 'img/car-not-found.jpg'}`}
                  alt={`${car.manufacture}-${car.model}`}
                  className="h-2/5 w-full rounded-t-lg object-cover"
                />
                <div className="h-3/5 p-6">
                  <article className="flex flex-wrap gap-4">
                    <div className="flex flex-wrap gap-2">
                      <p className="w-full text-sm text-neutral-900">
                        {car.manufacture} {car.model}/{car.type}
                      </p>
                      <p className="w-full text-base font-bold">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(car.rent_per_day)}{' '}
                        / hari
                      </p>
                      <p className="line-clamp-3 h-[60px] w-full text-sm">
                        {car.description}
                      </p>
                    </div>
                    <span className="flex w-full items-center gap-2">
                      <FiUsers className="text-neutral-500" />
                      <p className="text-sm">{car.capacity} orang</p>
                    </span>
                    <span className="flex w-full items-center gap-2">
                      <FiSettings className="text-neutral-500" />
                      <p className="text-sm">{car.transmission}</p>
                    </span>
                    <span className="flex w-full items-center gap-2">
                      <FiCalendar className="text-neutral-500" />
                      <p className="text-sm">Tahun {car.year}</p>
                    </span>
                    <button className="w-full rounded-sm bg-limegreen-700 px-2 py-3 font-bold text-neutral-100">
                      Pilih Mobil
                    </button>
                  </article>
                </div>
              </section>
            ))}
          </div>
          <div className="my-12 flex justify-center gap-6">
            <button
              className={`group flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-[#c4c4c4] hover:border-none hover:bg-limegreen-700 disabled:border-0 disabled:bg-limegreen-100`}
              disabled={page?.page === 1}
              onClick={goToPrevPage}
            >
              <FiChevronLeft className="group-hover:invert group-disabled:invert" />
            </button>
            <button
              className={`group flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-[#c4c4c4] hover:border-none hover:bg-limegreen-700 disabled:border-0 disabled:bg-limegreen-100`}
              disabled={page?.page === page?.total_page}
              onClick={goToNextPage}
            >
              <FiChevronRight className="group-hover:invert group-disabled:invert" />
            </button>
          </div>
        </div>
      )}
      {!!resErrors && (
        <div className="container mx-auto my-12 md:mt-0">
          <div className="mx-6 flex flex-wrap rounded-lg border border-danger bg-danger bg-opacity-10 px-4 py-3 text-sm font-light text-danger lg:mx-16">
            {resErrors.length > 1 ? (
              <>
                <p className="w-full">Error:</p>
                <ul className="list-disc pl-6">
                  {resErrors.map((error, idx) => (
                    <li key={idx}>
                      {error.path}: {error.message}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Error: {resErrors[0].message}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CarSearchResult
