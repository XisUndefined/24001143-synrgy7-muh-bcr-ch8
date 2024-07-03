import Breadcrumb from '../../components/Breadcrumb'
import RootLayout from '../../layouts/RootLayout'
import CarForm from '../../components/CarForm'

const NewCar = () => {
  return (
    <RootLayout>
      <Breadcrumb />
      <section className="my-4 w-full">
        <h2 className="text-xl font-bold">Add New Car</h2>
        <CarForm onSubmit={(data) => console.log(data)} />
      </section>
    </RootLayout>
  )
}

export default NewCar
