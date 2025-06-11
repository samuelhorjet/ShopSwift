"use client"
import dynamic from "next/dynamic"

// Loading placeholder with modern styling
const MapPlaceholder = () => (
  <div className="h-80 w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">Loading interactive map...</p>
    </div>
    {/* Animated background elements */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-6 left-8 w-4 h-4 bg-purple-400 rounded-full animate-pulse delay-700"></div>
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-1000"></div>
    </div>
  </div>
)

// Main component that uses dynamic import
const MapComponent = () => {
  const Map = dynamic(() => import("./map").then((mod) => mod.default), {
    loading: () => <MapPlaceholder />,
    ssr: false,
  })

  return (
    <div className="h-80 w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200">
      <Map />
    </div>
  )
}

export default MapComponent
