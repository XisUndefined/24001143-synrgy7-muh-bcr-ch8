export type CardContentType = {
  img: string
  review: string
  name: string
  age: number
  address: string
}

const TestimonialCard = ({
  img,
  review,
  name,
  age,
  address,
}: CardContentType) => {
  return (
    <div className="testimonial-card">
      <div className="review-img">
        <img src={img} alt={img.split('/').slice(-1)[0]} />
      </div>
      <div className="review">
        <p className="w-full text-sm font-light leading-5">{review}</p>
        <p className="w-full text-sm font-normal leading-5">
          {name} {age}, {address}
        </p>
      </div>
    </div>
  )
}

export default TestimonialCard
