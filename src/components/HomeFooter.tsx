const HomeFooter = () => {
  return (
    <footer className="flex w-full justify-center">
      <div className="container mx-auto my-7 flex flex-wrap items-center ps-4 md:my-20 xl:flex-nowrap xl:items-start">
        <div className="address my-2 flex flex-wrap gap-4 text-sm font-light leading-5 xl:w-1/4">
          <p className="w-full">
            Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000
          </p>
          <p className="w-full">binarcarrental@gmail.com</p>
          <p className="w-full">081-233-334-808</p>
        </div>
        <div className="link my-2 flex w-full flex-wrap gap-4 text-sm font-normal leading-5 xl:w-1/4">
          <a href="#services" className="w-full">
            Our services
          </a>
          <a href="#about" className="w-full">
            Why Us
          </a>
          <a href="#testimonial" className="w-full">
            Testimonial
          </a>
          <a href="#faq" className="w-full">
            FAQ
          </a>
        </div>
        <div className="contact my-2 flex w-full flex-wrap gap-4 text-sm font-light leading-5 xl:w-1/4">
          <p className="w-full">Connect with us</p>
          <div className="social flex w-full gap-4">
            <a href="#">
              <img src="img/facebook.svg" alt="facebook" />
            </a>
            <a href="#">
              <img src="img/instagram.svg" alt="instagram" />
            </a>
            <a href="#">
              <img src="img/twitter.svg" alt="twitter" />
            </a>
            <a href="#">
              <img src="img/email.svg" alt="email" />
            </a>
            <a href="#">
              <img src="img/twitch.svg" alt="twitch" />
            </a>
          </div>
        </div>
        <div className="copyright my-2 flex flex-wrap gap-4 text-sm font-light leading-5 xl:w-1/4">
          <p className="w-full">Copyright Binar 2022</p>
          <a
            href="#home"
            className="my-2 bg-darkblue-700 px-5 text-darkblue-700"
          >
            logo
          </a>
        </div>
      </div>
    </footer>
  )
}

export default HomeFooter
