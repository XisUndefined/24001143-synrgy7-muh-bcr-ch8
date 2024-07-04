import useHomeNavbar from '../../hooks/useHomeNavbar'

const HomeNavToggle = () => {
  const { isActive, handleActive } = useHomeNavbar()
  return (
    <>
      <button
        className={`z-50 block md:hidden ${isActive ? 'nav-line__active' : ''}`}
        onClick={handleActive}
      >
        <span className="nav-line origin-top-left transition duration-300 ease-in-out"></span>
        <span className="nav-line transition duration-300 ease-in-out"></span>
        <span className="nav-line origin-bottom-left transition duration-300 ease-in-out"></span>
      </button>
    </>
  )
}

export default HomeNavToggle
