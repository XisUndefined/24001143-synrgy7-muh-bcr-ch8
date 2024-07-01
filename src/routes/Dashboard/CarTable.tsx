import { useEffect, useRef } from 'react'
import useDashboard from '../../hooks/useDashboard'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import api from '../../api/api'
import SkipPage from './SkipPage'
import useTable from '../../hooks/useTable'
import { useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const CarTable = () => {
  const { tableLoading, setTableLoading, page, size, sort, setSort } =
    useTable()
  const {
    cars,
    carsNotFound,
    setCars,
    setCarsNotFound,
    carsPage,
    setCarsPage,
    parseParams,
  } = useDashboard()
  const { token } = useAuth()
  const location = useLocation()
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    const updateData = async () => {
      setTableLoading(true)
      const searchParams = parseParams(new URLSearchParams(location.search))
      if (page !== null) {
        searchParams.page = `${page}`
      }
      if (size !== null) {
        searchParams.size = `${size}`
      }
      if (sort !== null) {
        searchParams.sort = sort
      }

      try {
        const carResponse = await api.get(
          Object.keys(searchParams).length > 0
            ? `/admin/cars?${new URLSearchParams(searchParams).toString()}`
            : '/admin/cars',
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const resCars = await carResponse.json()

        if (!carResponse.ok) {
          setCarsNotFound(resCars)
          setCars(null)
          setCarsPage(null)
        } else if (carResponse.ok) {
          setCars(resCars.data)
          setCarsPage(resCars.paging)
          setCarsNotFound(null)
        }
      } catch {
        setCarsNotFound({
          status: 'error',
          message: 'Something went wrong!',
        })
        setCars(null)
        setCarsPage(null)
      } finally {
        setTableLoading(false)
      }
    }
    updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, sort, page])

  return (
    <>
      <section className="my-4 w-full">
        <span className="flex h-6 items-center gap-2">
          <span className="h-full w-1 bg-darkblue-700"></span>
          <h2 className="text-sm font-bold">List Car</h2>
        </span>
        <div className="my-4 w-full overflow-auto rounded-sm">
          {tableLoading ? (
            <Loading size="10px" bgSize="484px" />
          ) : (
            <table className="w-full min-w-max table-fixed">
              <thead>
                <tr className="grid grid-cols-28 bg-darkblue-100">
                  <th className="col-span-1 px-4 py-3 text-sm">No</th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Name{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(sort === 'name' ? '-name' : 'name')
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Category{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(sort === 'category' ? '-category' : 'category')
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Price{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(sort === 'price' ? '-price' : 'price')
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Created at{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'created_at' ? '-created_at' : 'created_at'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Updated at{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'updated_at' ? '-updated_at' : 'updated_at'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Deleted at{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'deleted_at' ? '-deleted_at' : 'deleted_at'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Created by{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'created_by' ? '-created_by' : 'created_by'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Updated by{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'updated_by' ? '-updated_by' : 'updated_by'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Deleted by{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'deleted_by' ? '-deleted_by' : 'deleted_by'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown />
                      </IconContext.Provider>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars ? (
                  cars.map((car, keyIdx) => (
                    <tr key={keyIdx} className="grid grid-cols-28">
                      <td className="col-span-1 px-4 py-3 text-center text-sm">
                        {keyIdx + 1}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {`${car.manufacture} ${car.model}`}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {car.category}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(car.rent_per_day)}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {new Date(car.created_at).toLocaleString()}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {new Date(car.updated_at).toLocaleString()}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {car.deleted_at
                          ? `${new Date(car.deleted_at).toLocaleString()}`
                          : '-'}
                      </td>
                      <td className="col-span-3 truncate px-4 py-3 text-start text-sm">
                        {car.created_by}
                      </td>
                      <td className="col-span-3 truncate px-4 py-3 text-start text-sm">
                        {car.updated_by ? `${car.updated_by}` : '-'}
                      </td>
                      <td className="col-span-3 truncate px-4 py-3 text-start text-sm">
                        {car.deleted_by ? `${car.deleted_by}` : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="grid grid-cols-19">
                    <td className="col-span-full px-4 py-3 text-center text-sm">
                      {carsNotFound!.message}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <SkipPage paging={carsPage} />
      </section>
    </>
  )
}

export default CarTable
