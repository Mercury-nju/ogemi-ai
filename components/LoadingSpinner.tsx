export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-700 border-t-purple-600 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

