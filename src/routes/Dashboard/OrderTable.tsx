import useDashboard from '../../hooks/useDashboard'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import Loading from '../../components/Loading'
import TableNavigation from './TableNavigation'
import useTable from '../../hooks/useTable'

const OrderTable = () => {
  const { tableLoading, sort, setSort } = useTable()
  const { orders, ordersNotFound, ordersPage } = useDashboard()

  return (
    <>
      <section className="my-4 w-full">
        <span className="flex h-6 items-center gap-2">
          <span className="h-full w-1 bg-darkblue-700"></span>
          <h2 className="text-sm font-bold">List Order</h2>
        </span>
        <div className="my-4 w-full overflow-auto rounded-sm">
          {tableLoading ? (
            <Loading size="10px" bgSize="484px" />
          ) : (
            <table className="w-full min-w-max table-fixed bg-neutral-100">
              <thead>
                <tr className="grid grid-cols-19 bg-darkblue-100">
                  <th className="col-span-1 px-4 py-3 text-sm">No</th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    User Email{' '}
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(sort === 'email' ? '-email' : 'email')
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp
                          className={`${sort === 'email' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-email' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Car
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() => setSort(sort === 'car' ? '-car' : 'car')}
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp
                          className={`${sort === 'car' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-car' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Start Rent
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'start_rent' ? '-start_rent' : 'start_rent'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp
                          className={`${sort === 'start_rent' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-start_rent' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Finish Rent
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(
                          sort === 'finish_rent'
                            ? '-finish_rent'
                            : 'finish_rent'
                        )
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp
                          className={`${sort === 'finish_rent' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-finish_rent' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Price
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
                        <FiChevronUp
                          className={`${sort === 'price' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-price' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                  <th className="col-span-3 flex justify-between px-4 py-3 text-start text-sm">
                    Status
                    <button
                      className="flex h-5 flex-col py-1"
                      onClick={() =>
                        setSort(sort === 'status' ? '-status' : 'status')
                      }
                    >
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronUp
                          className={`${sort === 'status' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          style: { strokeWidth: '5px' },
                        }}
                      >
                        <FiChevronDown
                          className={`${sort === '-status' ? 'text-black' : 'text-neutral-500'}`}
                        />
                      </IconContext.Provider>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders ? (
                  orders.map((order, keyIdx) => (
                    <tr key={keyIdx} className="grid grid-cols-19">
                      <td className="col-span-1 px-4 py-3 text-center text-sm">
                        {keyIdx + 1}
                      </td>
                      <td className="col-span-3 truncate px-4 py-3 text-start text-sm">
                        {order.email}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {order.car}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {new Date(order.start_rent).toLocaleString()}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {new Date(order.finish_rent).toLocaleString()}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {order.price}
                      </td>
                      <td className="col-span-3 px-4 py-3 text-start text-sm">
                        {order.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="grid grid-cols-19">
                    <td className="col-span-full px-4 py-3 text-center text-sm">
                      {ordersNotFound ? ordersNotFound.message : ''}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <TableNavigation paging={ordersPage} />
      </section>
    </>
  )
}

export default OrderTable
