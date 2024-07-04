import faq from './../../data/faq.json'
import FaqAccordion from './FaqAccordion'

const Faq = () => {
  return (
    <section id="faq" className="flex w-full justify-center">
      <div className="container mx-auto mt-[72px] flex flex-wrap items-center px-4 md:mt-[92px] xl:flex-nowrap xl:items-start">
        <article className="w-full xl:w-1/2">
          <h2 className="my-4 text-center text-2xl font-bold leading-9 xl:mb-4 xl:text-start">
            Frequently Asked Question
          </h2>
          <p className="my-4 text-center text-sm font-light leading-5 xl:text-start">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </article>
        <div className="flex flex-wrap gap-4 xl:w-1/2">
          {faq.map((content, index) => {
            return <FaqAccordion key={index} {...content} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq
