import useAuth from '../../hooks/useAuth'
import UserDropdown from './UserDropdown'
import { Link } from 'react-router-dom'
import useHomeNavbar from '../../hooks/useHomeNavbar'

const HomeNavMenu = () => {
  const { isActive, handleActive } = useHomeNavbar()
  const { isAuthenticated } = useAuth()

  return (
    <nav
      className={`z-20 ${isActive ? '' : 'max-md:hidden'} gap-4 max-md:absolute max-md:right-0 max-md:top-0 max-md:h-screen max-md:w-1/2 max-md:items-start max-md:divide-y max-md:divide-neutral-300 max-md:bg-white max-md:px-4 max-md:py-7 md:relative md:flex md:gap-8`}
    >
      <ul className="flex flex-wrap gap-4 text-nowrap text-sm leading-5 max-md:pb-4 max-md:before:font-bold max-md:before:content-['BCR'] md:gap-8 md:px-4 md:py-3">
        <li className="max-md:w-full">
          <Link
            preventScrollReset={false}
            to="/#services"
            onClick={handleActive}
          >
            Our Services
          </Link>
        </li>
        <li className="max-md:w-full">
          <Link preventScrollReset={false} to="/#about" onClick={handleActive}>
            Why Us
          </Link>
        </li>
        <li className="max-md:w-full">
          <Link
            preventScrollReset={false}
            to="/#testimonial"
            onClick={handleActive}
          >
            Testimonial
          </Link>
        </li>
        <li className="max-md:w-full">
          <Link preventScrollReset={false} to="/#faq" onClick={handleActive}>
            FAQ
          </Link>
        </li>
      </ul>
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <Link
          to={'/signup'}
          className="rounded-sm bg-limegreen-700 px-4 py-3 text-sm font-bold leading-5 text-white max-md:my-4"
        >
          Register
        </Link>
      )}
    </nav>
  )
}

export default HomeNavMenu
