import { useEffect, useRef, useState } from 'react'

const FaqAccordion = (props: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState('0px')
  const contentRef = useRef<HTMLDivElement>(null)

  const { question, answer } = props

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [isOpen])

  return (
    <div className="accordion-item">
      <button
        className={`accordion ${isOpen ? 'rounded-t border-x border-t after:rotate-180' : 'rounded border'} after:origin-center after:transform after:duration-500 after:ease-in-out`}
        type="button"
        onClick={handleClick}
      >
        {question}
      </button>
      <div
        ref={contentRef}
        style={{ height }}
        className={`accordion-collapse ${isOpen ? 'border' : 'border-0'} transition-all duration-500 ease-in-out`}
      >
        <p className="p-4">{answer}</p>
      </div>
    </div>
  )
}

export default FaqAccordion
