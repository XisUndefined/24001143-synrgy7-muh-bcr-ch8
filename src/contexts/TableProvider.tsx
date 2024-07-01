import React, { ReactNode, createContext, useState } from 'react'

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

const TableProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState<string | null>(null)
  const [page, setPage] = useState<number | null>(null)
  const [size, setSize] = useState<number | null>(null)
  const [tableLoading, setTableLoading] = useState(false)

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
