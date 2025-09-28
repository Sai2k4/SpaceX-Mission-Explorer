import React, { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import LaunchCard from '../components/Card/LaunchCard'
import useLaunches from '../hooks/useLaunches'
import SkeletonCard from '../components/Common/SkeletonCard'
import type { Launch } from '../types'

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites()
  const { data, loading, error } = useLaunches()
  const [selected, setSelected] = useState<Launch | null>(null)

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{new Array(6).fill(0).map((_,i) => <SkeletonCard key={i} />)}</div>
  if (error) return <div className="text-red-600">Error: {error}</div>
  if (!data) return null

  const favLaunches = data.filter(l => favorites.includes(l.id))

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Favorites</h2>
      {favLaunches.length === 0 ? (
        <div>No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favLaunches.map(l => <LaunchCard key={l.id} launch={l} onOpen={(launch) => setSelected(launch)} />)}
        </div>
      )}
      <div>
        {/* Modal reused */}
        {selected && <LaunchCard launch={selected} onOpen={() => {}} />}
      </div>
    </div>
  )
}

export default FavoritesPage
