// import { useState } from 'react'
import useDashboard from '../../hooks/useDashboard'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { IconContext } from 'react-icons'
import { useEffect, useRef, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import api from '../../api/api'
import Loading from '../../components/Loading'
import SkipPage from './SkipPage'

const OrderTable = () => {
  const [tableLoading, setTableLoading] = useState(false)
  const [sort, setSort] = useState<string | null>(null)

  const {
    orders,
    ordersNotFound,
    setOrders,
    setOrdersNotFound,
    ordersPage,
    setOrdersPage,
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
      if (sort !== null) {
        searchParams.sort = sort
      }
      searchParams.page = `${ordersPage!.page}`
      searchParams.size = `${ordersPage!.size}`

      try {
        const orderResponse = await api.get(
          `/order?${new URLSearchParams(searchParams)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        const resOrders = await orderResponse.json()

        if (!orderResponse.ok) {
          setOrdersNotFound(resOrders)
          setOrders(null)
        } else if (orderResponse.ok) {
          setOrders(resOrders.data)
          setOrdersNotFound(null)
        }
      } catch {
        setOrdersNotFound({
          status: 'error',
          message: 'Something went wrong!',
        })
        setOrders(null)
      } finally {
        setTableLoading(false)
      }
    }
    updateData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersPage, sort])

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
            <table className="w-max table-fixed">
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
                {orders ? (
                  orders.map((order, keyIdx) => (
                    <tr key={keyIdx} className="grid grid-cols-19">
                      <td className="col-span-1 px-4 py-3 text-center text-sm">
                        {keyIdx + 1}
                      </td>
                      <td className="col-span-3 line-clamp-1 px-4 py-3 text-start text-sm">
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
                      {ordersNotFound!.message}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <SkipPage paging={ordersPage!} setPaging={setOrdersPage} />
      </section>
    </>
  )
}

export default OrderTable
