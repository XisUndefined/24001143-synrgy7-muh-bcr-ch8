import { Link, useNavigate, useParams } from 'react-router-dom'
import Card from './Card'
import Pagination from '../../components/Pagination'
import useDashboard from '../../hooks/useDashboard'
import { FiPlus } from 'react-icons/fi'

const CarCards = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const { carsPage } = useDashboard()

  return (
    <>
      <section className="my-4 w-full">
        <div className="flex w-full justify-between gap-6">
          <h2 className="text-xl font-bold">List Car</h2>
          <Link
            to={'/admin/cars/create'}
            className="flex items-center gap-3 rounded-sm bg-darkblue-700 px-3 py-2 text-sm font-bold text-neutral-100 hover:bg-darkblue-900 active:bg-darkblue-500 disabled:bg-darkblue-100"
          >
            <FiPlus strokeWidth={4} />
            Add New Car
          </Link>
        </div>
        <div className="my-4 w-full">
          <div className="flex gap-4 overflow-auto">
            <button
              className={`${category ? 'border-darkblue-300 bg-neutral-100 text-darkblue-300' : 'border-darkblue-700 bg-darkblue-100 text-darkblue-700'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/admin/cars')}
            >
              All
            </button>
            <button
              className={`${category === 'small' ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-darkblue-300 bg-neutral-100 text-darkblue-300'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/admin/cars/category/small')}
            >
              Small
            </button>
            <button
              className={`${category === 'medium' ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-darkblue-300 bg-neutral-100 text-darkblue-300'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/admin/cars/category/medium')}
            >
              Medium
            </button>
            <button
              className={`${category === 'large' ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-darkblue-300 bg-neutral-100 text-darkblue-300'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/admin/cars/category/large')}
            >
              Large
            </button>
          </div>
          <Card />
          <div className="flex w-full justify-center">
            <Pagination
              page={carsPage ? carsPage.page : 1}
              total_page={carsPage ? carsPage.total_page : 1}
              handlePageClick={(pageNumber: number) =>
                navigate(`?page=${pageNumber}`)
              }
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default CarCards
