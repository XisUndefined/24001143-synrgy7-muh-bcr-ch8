import { Link, useLocation } from 'react-router-dom'

const Hero = () => {
  const location = useLocation()
  return (
    <section id="home" className="flex w-full justify-center bg-[#f1f3ff]">
      <div className="container mt-[72px] flex flex-wrap items-center px-4 md:mt-[92px] xl:flex-nowrap">
        <article className="w-full xl:w-1/2">
          <h1 className="my-2 text-4xl font-bold leading-normal">
            Sewa &amp; Rental Mobil Terbaik di kawasan (Lokasimu)
          </h1>
          <p className="my-2 text-sm font-light leading-5">
            Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas
            terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu
            untuk sewa mobil selama 24 jam.
          </p>
          {location.pathname === '/' && (
            <Link
              to={'/search'}
              className="my-2 inline-block rounded-sm bg-limegreen-700 px-4 py-3 text-sm font-bold leading-5 text-white"
            >
              Mulai Sewa Mobil
            </Link>
          )}
        </article>
        <div className="mt-6 flex w-full items-center justify-center xl:w-1/2">
          <img src="img/img_car.png" alt="Mercedes EQC 300kW Edition" />
        </div>
      </div>
    </section>
  )
}

export default Hero
