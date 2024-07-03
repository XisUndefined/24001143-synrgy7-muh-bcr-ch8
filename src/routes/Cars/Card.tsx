import { FiClock, FiEdit, FiTrash, FiUsers } from 'react-icons/fi'
import useDashboard from '../../hooks/useDashboard'
import { Link, useLocation } from 'react-router-dom'

const Card = () => {
  const { cars, setSelectedCarId } = useDashboard()
  const location = useLocation()
  return (
    <>
      {cars && (
        <div className="my-6 flex w-full flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
          {cars.map((car, idx) => (
            <div
              key={idx + 3}
              className="flex flex-col gap-4 rounded-lg bg-neutral-100 shadow-low"
            >
              <img
                className="h-1/2 rounded-t-lg object-cover"
                src={
                  car.image
                    ? `${car.image}`
                    : location.pathname.split('/').length > 2
                      ? '../../img/car-not-found.jpg'
                      : 'img/car-not-found.jpg'
                }
                alt=""
              />
              <div className="flex h-1/2 flex-wrap gap-6 px-6 pb-6">
                <article className="flex flex-wrap gap-4">
                  <span className="flex flex-wrap gap-2">
                    <p className="line-clamp-1 w-full text-sm">
                      {car.manufacture} {car.model}/{car.type}
                    </p>
                    <p className="w-full text-base font-bold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(car.rent_per_day)}{' '}
                      / hari
                    </p>
                  </span>
                  <span className="flex w-full items-center gap-2">
                    <FiUsers className="text-neutral-500" />
                    <p className="text-sm font-light">{car.capacity} orang</p>
                  </span>
                  <span className="flex w-full items-center gap-2">
                    <FiClock className="text-neutral-500" />
                    <p className="line-clamp-1 text-sm font-light">
                      {`Updated at ${new Date(car.updated_at)
                        .toUTCString()
                        .split(' ')
                        .slice(1, 4)
                        .join(' ')}, ${new Date(car.updated_at)
                        .toTimeString()
                        .split(':')
                        .slice(0, 2)
                        .join('.')}`}
                    </p>
                  </span>
                </article>
                <span className="flex w-full gap-4">
                  <button
                    className="flex w-1/2 items-center justify-center gap-2 rounded-sm border border-danger bg-neutral-100 px-3 py-2 text-sm font-bold text-danger"
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedCarId(car.id)
                    }}
                  >
                    <FiTrash />
                    Delete
                  </button>
                  <Link
                    to={`/cars/${car.id}`}
                    state={{ car }}
                    className="flex w-1/2 items-center justify-center gap-2 rounded-sm border border-limegreen-700 bg-limegreen-700 px-3 py-2 text-sm font-bold text-neutral-100"
                  >
                    <FiEdit />
                    Edit
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Card
