const Service = () => {
  return (
    <section id="services" className="flex w-full justify-center">
      <div className="container mx-auto mt-[72px] flex flex-wrap items-center justify-center px-4 md:mt-[92px] xl:flex-nowrap xl:px-16">
        <div className="flex w-full items-center justify-center max-xl:px-12 xl:w-1/2">
          <img src="img/img_service.png" alt="services" />
        </div>
        <article className="mt-6 w-full xl:w-1/2">
          <h2 className="my-4 text-2xl font-bold leading-9">
            Best Car Rental for any kind of trip in (Lokasimu)!
          </h2>
          <p className="my-4 text-sm font-light leading-5">
            Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga
            lebih murah dibandingkan yang lain, kondisi mobil baru, serta
            kualitas pelayanan terbaik untuk perjalanan wisata bisnis, wedding,
            meeting, dll.
          </p>
          <ul className="flex flex-wrap gap-4 text-sm font-light leading-5">
            <li className="flex w-full items-center before:mr-4 before:content-[url('img/check.svg')]">
              Sewa Mobil Dengan Supir di Bali 12 Jam
            </li>
            <li className="flex w-full items-center before:mr-4 before:content-[url('img/check.svg')]">
              Sewa Mobil Lepas Kunci di Bali 24 Jam
            </li>
            <li className="flex w-full items-center before:mr-4 before:content-[url('img/check.svg')]">
              Sewa Mobil Jangka Panjang Bulanan
            </li>
            <li className="flex w-full items-center before:mr-4 before:content-[url('img/check.svg')]">
              Gratis Antar - Jemput Mobil di Bandara
            </li>
            <li className="flex w-full items-center before:mr-4 before:content-[url('img/check.svg')]">
              Layanan Airport Transfer / Drop In Out
            </li>
          </ul>
        </article>
      </div>
    </section>
  )
}

export default Service
