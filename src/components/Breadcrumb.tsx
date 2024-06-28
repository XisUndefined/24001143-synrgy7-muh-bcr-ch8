import { FiChevronRight } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()

  return (
    <span className="flex items-center gap-1 text-xs font-bold">
      {location.pathname.split('/').length > 2 ? (
        location.pathname.split('/').map(
          (path, idx) =>
            idx > 0 && (
              <>
                <FiChevronRight key={idx + 1} />
                <p
                  key={idx}
                  className={`first-letter:capitalize ${location.pathname.split('/').slice(-1)[0] === path ? 'font-display font-light' : ''}`}
                >{`${path === '' ? 'dashboard' : `${path}`}`}</p>
              </>
            )
        )
      ) : (
        <p
          className={`font-display font-light first-letter:capitalize`}
        >{`${location.pathname.split('/').slice(-1)[0] === '' ? 'dashboard' : `${location.pathname.split('/').slice(-1)[0]}`}`}</p>
      )}
    </span>
  )
}

export default Breadcrumb
