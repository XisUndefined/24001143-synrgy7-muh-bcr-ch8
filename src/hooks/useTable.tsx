import { useContext } from 'react'
import { TableContext } from '../contexts/TableProvider'

const useTable = () => {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('useTable must be used within a TableProvider')
  }
  const {
    tableLoading,
    setTableLoading,
    sort,
    setSort,
    page,
    setPage,
    size,
    setSize,
  } = context

  return {
    tableLoading,
    setTableLoading,
    sort,
    setSort,
    page,
    setPage,
    size,
    setSize,
  }
}

export default useTable
