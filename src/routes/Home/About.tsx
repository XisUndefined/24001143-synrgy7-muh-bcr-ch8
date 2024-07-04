const About = () => {
  return (
    <section id="about" className="flex w-full justify-center">
      <div className="container mx-auto mt-[72px] flex flex-wrap items-center justify-center px-4 md:mt-[92px] xl:flex-nowrap">
        <article>
          <h2 className="my-5 text-center text-2xl font-bold leading-9 xl:text-start">
            Why Us?
          </h2>
          <p className="my-5 text-center text-sm font-light leading-5 xl:text-start">
            Mengapa harus pilih Binar Car Rental?
          </p>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="about-card">
              <img src="img/thumbs-up.svg" alt="thumbs-up" />
              <h3 className="my-4 text-[16px] font-bold leading-6">
                Mobil Lengkap
              </h3>
              <p className="text-sm font-light leading-5">
                Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan
                terawat
              </p>
            </div>
            <div className="about-card">
              <img src="img/price-tag.svg" alt="price-tag" />
              <h3 className="my-4 text-[16px] font-bold leading-6">
                Harga Murah
              </h3>
              <p className="text-sm font-light leading-5">
                Harga murah dan bersaing, bisa bandingkan harga kami dengan
                rental mobil lain
              </p>
            </div>
            <div className="about-card">
              <img src="img/24-hours.svg" alt="24-hours" />
              <h3 className="my-4 text-[16px] font-bold leading-6">
                Layanan 24 Jam
              </h3>
              <p className="text-sm font-light leading-5">
                Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga
                tersedia di akhir minggu
              </p>
            </div>
            <div className="about-card">
              <img src="img/icon-professional.svg" alt="icon-professional" />
              <h3 className="my-4 text-[16px] font-bold leading-6">
                Sopir Profesional
              </h3>
              <p className="text-sm font-light leading-5">
                Sopir yang profesional, berpengalaman, jujur, ramah dan selalu
                tepat waktu
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default About
