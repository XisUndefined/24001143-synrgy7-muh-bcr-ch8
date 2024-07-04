import { useEffect, useRef, useState } from 'react'
import testimonials from './../../data/testimonials.json'
import HomeSliderProvider from '../../contexts/HomeSliderProvider'
import TestimonialArrowGroup from './TestimonialArrowGroup'
import TestimonialCard from './TestimonialCard'

const Testimonial = () => {
  const [index, setIndex] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleContainerHeight = () => {
    if (containerRef.current) {
      const heights = Array.from(containerRef.current.children).map(
        (child) => (child as HTMLElement).offsetHeight
      )
      setContainerHeight(Math.max(...heights))
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleContainerHeight)
    handleContainerHeight()

    return () => window.removeEventListener('resize', handleContainerHeight)
  }, [index])

  return (
    <section id="testimonial" className="-z-10 flex w-full justify-center">
      <div className="container mx-auto mt-[72px] flex flex-wrap items-center justify-center px-4 md:mt-[92px]">
        <article className="my-4 w-full">
          <h1 className="my-4 text-center text-2xl font-bold leading-9">
            Testimonial
          </h1>
          <p className="my-4 text-center text-sm font-light leading-5">
            Berbagai review positif dari para pelanggan kami
          </p>
        </article>
        <div
          ref={containerRef}
          className="relative flex w-full justify-center overflow-hidden"
          style={{ height: containerHeight }}
        >
          {testimonials.map((review, idx) => {
            const isCurrent = idx === index
            const isPrev = idx === index - 1
            const isNext = idx === index + 1

            return (
              <div
                key={idx}
                className={`absolute ${isCurrent ? 'z-[3] scale-100' : 'scale-95 opacity-60'} ${isPrev ? '-translate-x-full' : ''} ${isNext ? 'translate-x-full' : ''} ${!isCurrent && !isPrev && !isNext ? 'hidden' : ''} w-full px-4 duration-300 ease-in-out md:w-1/2`}
              >
                <TestimonialCard {...review} key={idx} />
              </div>
            )
          })}
        </div>
        <HomeSliderProvider
          length={testimonials.length}
          setIndex={setIndex}
          index={index}
        >
          <TestimonialArrowGroup />
        </HomeSliderProvider>
      </div>
    </section>
  )
}

export default Testimonial
