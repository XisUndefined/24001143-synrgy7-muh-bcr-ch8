import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

type Paging = {
  page: number
  total_page: number
  size: number
}

const SkipPage = ({
  paging,
  setPaging,
}: {
  paging: Paging
  setPaging: React.Dispatch<React.SetStateAction<Paging | null>>
}) => {
  const [sizeDropdown, setSizeDropdown] = useState<boolean>(false)
  const [pageDropdown, setPageDropdown] = useState<boolean>(false)
  const [internalSize, setInternalSize] = useState<number>(paging.size)
  const [internalPage, setInternalPage] = useState<number>(paging.page)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPaging({
      page: internalPage,
      total_page: paging.total_page,
      size: internalSize,
    })
  }

  return (
    <div className="w-full overflow-x-clip">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div className="relative flex w-14 select-none flex-wrap gap-2">
            <p className="font-display text-xs font-light">Limit</p>
            <span className="flex rounded-sm border border-neutral-300 px-3 py-2">
              <input
                id="size"
                type="number"
                className="w-full font-display text-xs font-medium text-neutral-500 focus:outline-none"
                value={internalSize}
                placeholder={`${paging.size}`}
                min={1}
                max={50}
                readOnly
              />
              <FiChevronDown
                className={`text-xl text-neutral-300 transition-all duration-300 ease-in-out ${sizeDropdown ? 'rotate-180' : ''}`}
                onClick={() => setSizeDropdown(!sizeDropdown)}
              />
            </span>
            {sizeDropdown && (
              <div className="absolute top-16 h-28 w-14 overflow-auto rounded-sm border border-neutral-300 bg-neutral-100 transition-transform duration-300 ease-in-out">
                <button
                  className="w-full px-3 py-2 text-start font-display text-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    setInternalSize(10)
                    setSizeDropdown(false)
                  }}
                >
                  10
                </button>
                <button
                  className="w-full px-3 py-2 text-start font-display text-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    setInternalSize(15)
                    setSizeDropdown(false)
                  }}
                >
                  15
                </button>
                <button
                  className="w-full px-3 py-2 text-start font-display text-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    setInternalSize(25)
                    setSizeDropdown(false)
                  }}
                >
                  25
                </button>
                <button
                  className="w-full px-3 py-2 text-start font-display text-xs"
                  onClick={(e) => {
                    e.preventDefault()
                    setInternalSize(50)
                    setSizeDropdown(false)
                  }}
                >
                  50
                </button>
              </div>
            )}
          </div>
          <div className="relative flex select-none items-end">
            <div className="flex w-20 flex-wrap gap-2">
              <p className="font-display text-xs font-light">Jump to page</p>
              <span className="flex w-full rounded-sm border border-neutral-300 px-3 py-2">
                <input
                  id="page"
                  type="number"
                  className="w-full font-display text-xs font-medium text-neutral-500 focus:outline-none"
                  placeholder={`${paging.page}`}
                  value={internalPage}
                  min={1}
                  max={`${paging.total_page}`}
                  readOnly
                />
                <FiChevronDown
                  className={`text-xl text-neutral-300 transition-transform duration-300 ease-in-out ${pageDropdown ? 'rotate-180' : ''}`}
                  onClick={() => setPageDropdown(!pageDropdown)}
                />
              </span>
            </div>
            <button
              className="h-fit rounded-r-sm border border-darkblue-700 bg-darkblue-700 px-3 py-2 font-display text-sm font-medium text-neutral-100"
              type="submit"
            >
              Go
            </button>
            {pageDropdown && (
              <div className="absolute top-16 max-h-28 w-20 overflow-auto rounded-sm border border-neutral-300 bg-neutral-100 transition-all duration-300 ease-in-out">
                {[...Array(paging.total_page)].map((_, pageIdx) => (
                  <button
                    key={pageIdx}
                    className="w-full px-3 py-2 text-start font-display text-xs"
                    onClick={(e) => {
                      e.preventDefault()
                      setInternalPage(pageIdx + 1)
                      setPageDropdown(false)
                    }}
                  >
                    {pageIdx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SkipPage
