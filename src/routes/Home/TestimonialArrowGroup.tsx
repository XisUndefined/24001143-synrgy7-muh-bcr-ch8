import TestimonialNextArrow from './TestimonialNextArrow'
import TestimonialPrevArrow from './TestimonialPrevArrow'

const TestimonialArrowGroup = () => {
  return (
    <div className="my-4 flex justify-between gap-6">
      <TestimonialPrevArrow />
      <TestimonialNextArrow />
    </div>
  )
}

export default TestimonialArrowGroup
