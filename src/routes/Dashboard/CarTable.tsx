import { useEffect, useRef, useState } from 'react'
import useDashboard from '../../hooks/useDashboard'
import useAuth from '../../hooks/useAuth'
import Loading from '../../components/Loading'
import api from '../../api/api'
import SkipPage from './SkipPage'

const CarTable = () => {
  const [tableLoading, setTableLoading] = useState(false)

  const {
    cars,
    carsNotFound,
    setCars,
    setCarsNotFound,
    carsPage,
    setCarsPage,
  } = useDashboard()
  const { token } = useAuth()
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    const updateData = async () => {
      setTableLoading(true)
      const searchParams: { [key: string]: string } = {}
      searchParams.page = `${carsPage!.page}`
      searchParams.size = `${carsPage!.size}`

      try {
        const carsResponse = await api.get(
          `/admin/cars?${new URLSearchParams(searchParams)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const resCars = await carsResponse.json()

        if (!carsResponse.ok) {
          setCarsNotFound(resCars)
          setCars(null)
        } else if (carsResponse.ok) {
          setCars(resCars.data)
          setCarsNotFound(null)
        }
      } catch {
        setCarsNotFound({
          status: 'error',
          message: 'Something went wrong!',
        })
        setCars(null)
      } finally {
        setTableLoading(false)
      }
    }
    updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carsPage])

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
                <tr className="grid-cols-28 grid bg-darkblue-100">
                  <th className="col-span-1 px-4 py-3 text-sm">No</th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Name
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Category
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Price
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Created at
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Updated at
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Deleted at
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Created by
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Updated by
                  </th>
                  <th className="col-span-3 px-4 py-3 text-start text-sm">
                    Deleted by
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars ? (
                  cars.map((car, keyIdx) => (
                    <tr key={keyIdx} className="grid-cols-28 grid">
                      <td className="col-span-1 px-4 py-3 text-center text-sm">
                        {keyIdx + 1}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {`${car.model} ${car.manufacture}`}
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
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {car.created_by}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {car.updated_by ? `${car.updated_by}` : '-'}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
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
        <SkipPage paging={carsPage!} setPaging={setCarsPage} />
      </section>
    </>
  )
}

export default CarTable
