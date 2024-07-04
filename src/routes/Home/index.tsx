import HomeLayout from '../../layouts/HomeLayout'
import About from './About'
import Faq from './Faq'
import Hero from './Hero'
import Order from './Order'
import Service from './Service'
import Testimonial from './Testimonial'

const Home = () => {
  return (
    <HomeLayout>
      <Hero />
      <Service />
      <About />
      <Testimonial />
      <Order />
      <Faq />
    </HomeLayout>
  )
}

export default Home
