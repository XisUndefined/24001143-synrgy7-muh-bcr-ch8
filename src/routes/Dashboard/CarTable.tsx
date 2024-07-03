import useDashboard from '../../hooks/useDashboard'
import Loading from '../../components/Loading'
import TableNavigation from './TableNavigation'
import useTable from '../../hooks/useTable'
import { IconContext } from 'react-icons'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const CarTable = () => {
  const { tableLoading, sort, setSort } = useTable()
  const { cars, carsNotFound, carsPage } = useDashboard()

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
            <table className="w-full min-w-max table-fixed bg-neutral-100">
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
                        <FiChevronUp
                          className={`${sort === 'name' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-name' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'category' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-category' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Price{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'rent_per_day'
                            ? '-rent_per_day'
                            : 'rent_per_day'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp
                          className={`${sort === 'rent_per_day' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-rent_per_day' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'created_at' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-created_at' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'updated_at' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-updated_at' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'deleted_at' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-deleted_at' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'created_by' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-created_by' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'updated_by' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-updated_by' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                        <FiChevronUp
                          className={`${sort === 'deleted_by' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-deleted_by' ? 'text-black' : 'text-neutral-500'}`}
                        />
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
                      {carsNotFound ? carsNotFound.message : ''}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <TableNavigation paging={carsPage} />
      </section>
    </>
  )
}

export default CarTable
