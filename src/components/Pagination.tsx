import React from 'react'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
// import useTable from '../hooks/useTable'

interface PagingProps {
  page: number
  total_page: number
  handlePageClick: (pageNumber: number) => void
}

const Pagination: React.FC<PagingProps> = ({
  page,
  total_page,
  handlePageClick,
}) => {
  // const { setPage } = useTable()

  // const handlePageClick = (pageNumber: number) => {
  //   setPage(pageNumber)
  // }

  const renderPageButtons = () => {
    const buttons = []
    if (total_page <= 5) {
      for (let i = 1; i <= total_page; i++) {
        buttons.push(
          <button
            key={i}
            className={`rounded-sm border px-3 py-2 ${i === page ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
            onClick={() => handlePageClick(i)}
            disabled={i === page}
          >
            {i}
          </button>
        )
      }
    } else {
      buttons.push(
        <button
          key={1}
          className={`rounded-sm border px-3 py-2 ${1 === page ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
          onClick={() => handlePageClick(1)}
          disabled={1 === page}
        >
          1
        </button>
      )

      if (page > 3) {
        buttons.push(
          <button
            key="dots1"
            className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
            disabled
          >
            ...
          </button>
        )
      }

      for (
        let i = Math.max(2, page - 1);
        i < Math.min(total_page - 1, page + 1);
        i++
      ) {
        buttons.push(
          <button
            key={i}
            className={`rounded-sm border px-3 py-2 ${i === page ? 'border-darkblue-100 bg-darkblue-700 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
            onClick={() => handlePageClick(i)}
            disabled={i === page}
          >
            {i}
          </button>
        )
      }

      if (page < total_page - 2) {
        buttons.push(
          <button
            key="dots2"
            className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
            disabled
          >
            ...
          </button>
        )
      }

      buttons.push(
        <button
          key={total_page}
          className={`rounded-sm border px-3 py-2 ${total_page === page ? 'border-darkblue-100 bg-darkblue-700 text-darkblue-700' : 'border-neutral-300 bg-neutral-100 text-neutral-500'}`}
          onClick={() => handlePageClick(total_page)}
          disabled={total_page === page}
        >
          {total_page}
        </button>
      )
    }

    return buttons
  }
  return (
    <div className="flex text-xs">
      <button
        className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
        onClick={() => handlePageClick(page - 1)}
        disabled={page === 1}
      >
        <FiChevronsLeft className="text-base" />
      </button>
      {renderPageButtons()}
      <button
        className="rounded-sm border border-neutral-300 bg-neutral-100 px-3 py-2 text-neutral-500"
        onClick={() => handlePageClick(page + 1)}
        disabled={total_page === page}
      >
        <FiChevronsRight className="text-base" />
      </button>
    </div>
  )
}

export default Pagination
