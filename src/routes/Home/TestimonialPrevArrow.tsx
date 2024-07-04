import { useHomeSlider } from '../../hooks/useHomeSlider'

const TestimonialPrevArrow = () => {
  const { goToPrev, index } = useHomeSlider()
  return (
    <button
      className={`group flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-[#c4c4c4] hover:border-none hover:bg-limegreen-700`}
      onClick={goToPrev}
      disabled={index === 0}
    >
      <img src="img/left.svg" alt="left" className="group-hover:invert" />
    </button>
  )
}

export default TestimonialPrevArrow
