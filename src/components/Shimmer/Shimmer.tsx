const Shimmer = () => {
  return (
    <div className="p-0 w-full mx-auto">
      <div className="animate-pulse flex">
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default Shimmer
