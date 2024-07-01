import { useNavigate, useParams } from 'react-router-dom'
import Card from './Card'

const CarCards = () => {
  const { category } = useParams()
  const navigate = useNavigate()

  return (
    <>
      <section className="my-4 w-full">
        <h2 className="text-xl font-bold">List Car</h2>
        <div className="my-4 w-full">
          <div className="flex gap-4 overflow-auto">
            <button
              className={`${category ? 'border-darkblue-300 bg-neutral-100 text-darkblue-300' : 'border-darkblue-700 bg-darkblue-100 text-darkblue-700'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/cars')}
            >
              All
            </button>
            <button
              className={`${category === 'small' ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-darkblue-300 bg-neutral-100 text-darkblue-300'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/cars/category/small')}
            >
              Small
            </button>
            <button
              className={`${category === 'medium' ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-darkblue-300 bg-neutral-100 text-darkblue-300'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/cars/category/medium')}
            >
              Medium
            </button>
            <button
              className={`${category === 'large' ? 'border-darkblue-700 bg-darkblue-100 text-darkblue-700' : 'border-darkblue-300 bg-neutral-100 text-darkblue-300'} rounded-sm border px-3 py-2 text-sm font-bold`}
              onClick={() => navigate('/cars/category/large')}
            >
              Large
            </button>
          </div>
          <Card />
          {/* <div className='w-full my-6 flex flex-wrap'>

          </div> */}
        </div>
      </section>
    </>
  )
}

export default CarCards
