const Loading = ({ size, bgSize }: { size: string; bgSize: string }) => {
  return (
    <div
      className="flex items-center justify-center bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-10"
      style={{ gap: `calc(${size}/4)`, height: bgSize }}
    >
      <span className="sr-only">Loading...</span>
      <div
        style={{ height: size, width: size }}
        className={`animate-bounce rounded-full bg-darkblue-700 [animation-delay:-0.3s]`}
      ></div>
      <div
        style={{ height: size, width: size }}
        className={`[animation-delay:-0.15s]" animate-bounce rounded-full bg-darkblue-700`}
      ></div>
      <div
        style={{ height: size, width: size }}
        className={`animate-bounce rounded-full bg-darkblue-700`}
      ></div>
    </div>
  )
}

export default Loading
