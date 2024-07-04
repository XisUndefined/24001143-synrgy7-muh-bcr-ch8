import { useHomeSlider } from '../../hooks/useHomeSlider'

const TestimonialNextArrow = () => {
  const { goToNext, index, length } = useHomeSlider()
  return (
    <button
      className={`group flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-[#c4c4c4] hover:border-none hover:bg-limegreen-700`}
      onClick={goToNext}
      disabled={index === length - 1}
    >
      <img src="img/right.svg" alt="right" className="group-hover:invert" />
    </button>
  )
}

export default TestimonialNextArrow
