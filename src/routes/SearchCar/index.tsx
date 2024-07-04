import CustomerCarProvider from '../../contexts/CustomerCarProvider'
import HomeLayout from '../../layouts/HomeLayout'
import Hero from '../Home/Hero'
import CarSearchForm from './CarSearchForm'
import CarSearchResult from './CarSearchResult'

const SearchCar = () => {
  return (
    <>
      <HomeLayout>
        <CustomerCarProvider>
          <Hero />
          <CarSearchForm />
          <CarSearchResult />
        </CustomerCarProvider>
      </HomeLayout>
    </>
  )
}

export default SearchCar
