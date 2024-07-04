import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const UserDropdown = () => {
  const [dropdown, setDropdown] = useState(false)
  const { user } = useAuth()

  const handleClick = () => {
    setDropdown(!dropdown)
  }
  return (
    <>
      <div
        className="flex cursor-pointer select-none items-center gap-1 max-md:py-4"
        onClick={handleClick}
      >
        <img
          src={`${user ? user.avatar : ''}`}
          alt="profile-picture"
          className="h-7 w-7 rounded-full md:h-9 md:w-9"
        />
        <div className="min-w-0 px-2 text-xs text-neutral-900 md:hidden">
          <p className="font-bold">{`${user ? (user.lastname ? `${user!.firstname} ${user!.lastname}` : `${user!.firstname}`) : ''}`}</p>
          <p className="truncate font-light italic">{user ? user.email : ''}</p>
        </div>
        <FiChevronDown
          className={`${dropdown ? 'origin-center rotate-180 transform duration-300 ease-in-out' : ''}`}
        />
      </div>
      {dropdown && (
        <ul
          className={`flex select-none flex-wrap text-nowrap text-sm leading-5 transition-all duration-500 ease-in-out max-md:py-4 md:absolute md:right-0 md:top-20 md:divide-y md:rounded-lg md:bg-[#f1f3ff] md:px-3 md:py-4 md:shadow-low`}
        >
          <li className="md: w-full py-2">
            <Link to={'/profile'}>Profile</Link>
          </li>
          <li className="md: w-full py-2">
            <Link to={'/orders'}>Orders</Link>
          </li>
          <li className="md: w-full py-2">
            <Link to={'/logout'}>Sign Out</Link>
          </li>
        </ul>
      )}
    </>
  )
}

export default UserDropdown
