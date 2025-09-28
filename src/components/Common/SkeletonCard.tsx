import React from 'react'

const SkeletonCard: React.FC = () => {
  return (
    <div className="p-4 border rounded bg-white animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
    </div>
  )
}

export default SkeletonCard
