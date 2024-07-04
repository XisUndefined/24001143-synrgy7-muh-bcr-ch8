const Spinner = ({
  size,
  borderSize,
}: {
  size: string
  borderSize: string
}) => {
  return (
    <>
      <span className="sr-only">Loading...</span>
      <div
        style={{ height: size, width: size, borderWidth: borderSize }}
        className="animate-spin rounded-full border-neutral-300 border-t-darkblue-700"
      ></div>
    </>
  )
}

export default Spinner
