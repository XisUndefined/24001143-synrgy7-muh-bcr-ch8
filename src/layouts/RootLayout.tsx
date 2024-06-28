import { Link, NavLink } from 'react-router-dom'
import useNavbar from '../hooks/useNavbar'
import {
  FiChevronDown,
  FiHome,
  FiMenu,
  FiSearch,
  FiTruck,
  FiX,
} from 'react-icons/fi'
import { ReactNode } from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { isNavActive, handleNavActive } = useNavbar()

  return (
    <div className="flex h-screen">
      <aside className="z-10 h-full w-20 min-w-20 bg-darkblue-700 max-md:absolute max-md:-left-20 max-md:w-20">
        <div className="h-20 w-full p-5">
          <Link
            to={'/'}
            className="inline-block h-full w-full bg-darkblue-100"
          ></Link>
        </div>
        <div className="w-full transition-all duration-1000">
          <NavLink
            to={'/dashboard'}
            className={({ isActive }) =>
              isActive
                ? 'flex h-20 flex-wrap items-center justify-center gap-1 bg-neutral-100 bg-opacity-30 py-5 font-bold text-neutral-100'
                : 'flex h-20 flex-wrap items-center justify-center gap-1 py-5 font-bold text-neutral-100'
            }
          >
            <FiHome
              className={`w-full ${isNavActive ? 'text-3xl' : 'text-2xl'} duration-300`}
            />
            {!isNavActive && <span className="text-xs">Dashboard</span>}
          </NavLink>
          <NavLink
            to={'/cars'}
            className={({ isActive }) =>
              isActive
                ? 'flex h-20 flex-wrap items-center justify-center gap-1 bg-neutral-100 bg-opacity-30 py-5 font-bold text-neutral-100'
                : 'flex h-20 flex-wrap items-center justify-center gap-1 py-5 font-bold text-neutral-100'
            }
          >
            <FiTruck
              className={`w-full ${isNavActive ? 'text-3xl' : 'text-2xl'} duration-300`}
            />
            {!isNavActive && <span className="text-xs">Cars</span>}
          </NavLink>
        </div>
      </aside>
      <nav
        className={`h-full bg-darkblue-700 transition-all duration-300 ease-in-out max-md:absolute max-md:pl-20 ${isNavActive ? 'w-3/4 md:w-56' : 'w-0'} text-neutral-100 max-md:-left-20`}
      >
        <div className="h-20 w-3/5 py-5">
          <Link
            to={'/'}
            className="inline-block h-full w-full bg-darkblue-100"
          ></Link>
        </div>
        <NavLink
          to={'/dashboard'}
          className={({ isActive }) =>
            isActive
              ? 'flex h-20 w-full items-center bg-neutral-100 bg-opacity-30'
              : 'flex h-20 w-full items-center'
          }
          onClick={handleNavActive}
        >
          <p
            className={`${isNavActive ? '' : '-translate-x-full'} text-xl font-bold duration-300 ease-in-out`}
          >
            Dashboard
          </p>
        </NavLink>
        <NavLink
          to={'/cars'}
          className={({ isActive }) =>
            isActive
              ? 'flex h-20 w-full items-center bg-neutral-100 bg-opacity-30'
              : 'flex h-20 w-full items-center'
          }
          onClick={handleNavActive}
        >
          <p
            className={`${isNavActive ? '' : '-translate-x-full'} text-xl font-bold duration-300 ease-in-out`}
          >
            Cars
          </p>
        </NavLink>
      </nav>
      <div className="flex h-full w-full flex-col overflow-auto">
        <header className="sticky top-0 flex h-20 w-full items-center justify-between gap-6 bg-neutral-100 p-6 shadow-low">
          <button
            onClick={handleNavActive}
            className="transition-all duration-1000"
          >
            {isNavActive ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
          <div className="flex w-full gap-6 md:w-2/3 lg:w-1/3">
            <form className="flex w-full">
              <span className="flex w-full items-center gap-2 rounded-sm border border-neutral-300 px-3 py-2">
                <FiSearch className="text-lg text-neutral-300" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full font-sans text-xs placeholder:font-sans placeholder:text-xs focus:outline-none"
                />
              </span>
              <button
                type="submit"
                className="hidden rounded-sm border border-darkblue-700 px-3 py-2 text-center text-sm font-bold text-darkblue-700 md:inline-block"
              >
                Search
              </button>
            </form>
            <button className="flex items-center gap-2 max-md:min-w-fit">
              <img
                src="https://ui-avatars.com/api/?name=Unis+Badri"
                alt="profile-picture"
                className="h-10 w-10 rounded-full"
              />
              <p className="line-clamp-1 text-sm max-lg:hidden">Unis Badri</p>
              <FiChevronDown className="text-2xl max-md:hidden" />
            </button>
          </div>
        </header>
        <main className="h-full w-full overflow-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default RootLayout
