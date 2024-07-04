import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <section id="order" className="flex w-full justify-center px-4">
      <div className="container mx-auto mt-[72px] flex flex-wrap items-center justify-center rounded-[13px] bg-darkblue-700 p-12 md:mt-[92px]">
        <article className="w-full text-center text-white">
          <h2 className="my-4 text-2xl font-bold leading-9">
            Sewa Mobil di (Lokasimu) Sekarang
          </h2>
          <p className="my-4 text-sm font-light leading-5 xl:px-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quam
            nesciunt veniam nobis earum molestiae voluptatem deserunt commodi
            nam repellat.
          </p>
        </article>
        <Link
          to={'/search'}
          className="my-4 rounded-sm bg-limegreen-700 px-4 py-3 text-sm font-bold leading-5 text-white hover:bg-limegreen-500"
        >
          Mulai Sewa Mobil
        </Link>
      </div>
    </section>
  )
}

export default Order
