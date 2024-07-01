import { FiChevronRight } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <span className="flex items-center gap-1 text-xs font-bold">
      <Link
        to={`/${pathnames[0] === 'cars' ? 'cars' : 'dashboard'}`}
        className={`first-letter:capitalize ${pathnames.slice(-1)[0] === pathnames[0] ? 'font-display font-light' : ''} hover:underline`}
      >
        {`${pathnames[0] === 'cars' ? 'cars' : 'dashboard'}`}
      </Link>
      {pathnames.slice(1).map((path, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <FiChevronRight />
          {path !== 'category' ? (
            <Link
              to={`/${pathnames.slice(0).join('/')}`}
              className={`first-letter:capitalize ${pathnames.slice(-1)[0] === path ? 'font-display font-light' : ''} hover:underline`}
            >
              {path}
            </Link>
          ) : (
            <p
              className={`first-letter:capitalize ${pathnames.slice(-1)[0] === path ? 'font-display font-light' : ''}`}
            >
              {path}
            </p>
          )}
        </span>
      ))}
    </span>
  )
}

export default Breadcrumb
