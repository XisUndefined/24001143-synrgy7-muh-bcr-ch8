import React, {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import useDashboard from '../hooks/useDashboard'
import api from '../api/api'
import useAuth from '../hooks/useAuth'

type TableContextType = {
  sort: string | null
  setSort: React.Dispatch<React.SetStateAction<string | null>>
  page: number | null
  setPage: React.Dispatch<React.SetStateAction<number | null>>
  size: number | null
  setSize: React.Dispatch<React.SetStateAction<number | null>>
  tableLoading: boolean
  setTableLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableContext = createContext<TableContextType | null>(null)

const TableProvider = ({
  children,
  options,
}: {
  children: ReactNode
  options: { table: 'cars' | 'orders' }
}) => {
  const [sort, setSort] = useState<string | null>(null)
  const [page, setPage] = useState<number | null>(null)
  const [size, setSize] = useState<number | null>(null)
  const [tableLoading, setTableLoading] = useState(false)
  const location = useLocation()
  const {
    setOrders,
    setOrdersPage,
    setOrdersNotFound,
    setCars,
    setCarsPage,
    setCarsNotFound,
    parseParams,
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
      const searchParams = parseParams(new URLSearchParams(location.search), [
        'q',
      ])
      if (page !== null) {
        searchParams.page = `${page}`
      }
      if (size !== null) {
        searchParams.size = `${size}`
      }
      if (sort !== null) {
        searchParams.sort = sort
      }

      if (options.table === 'orders') {
        try {
          const orderResponse = await api.get(
            Object.keys(searchParams).length > 0
              ? `/admin/order?${new URLSearchParams(searchParams).toString()}`
              : '/admin/order',
            { headers: { Authorization: `Bearer ${token}` } }
          )

          const resOrders = await orderResponse.json()

          if (!orderResponse.ok) {
            setOrdersNotFound(resOrders)
            setOrders(null)
            setOrdersPage(null)
          } else if (orderResponse.ok) {
            setOrders(resOrders.data)
            setOrdersPage(resOrders.paging)
            setOrdersNotFound(null)
          }
        } catch {
          setOrdersNotFound({
            status: 'error',
            message: 'Something went wrong!',
          })
          setOrders(null)
          setOrdersPage(null)
        } finally {
          setTableLoading(false)
        }
      } else {
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
    }
    updateData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, sort, page])

  return (
    <TableContext.Provider
      value={{
        sort,
        page,
        size,
        setSort,
        setPage,
        setSize,
        tableLoading,
        setTableLoading,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export default TableProvider
