import React from 'react'
import { useFavorites } from '../../context/FavoritesContext'
import type { Launch } from '../../types'

type Props = {
  launch: Launch
  onOpen: (launch: Launch) => void
}

const LaunchCard: React.FC<Props> = ({ launch, onOpen }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const date = new Date(launch.date_utc).toLocaleDateString()

  return (
    <article className="p-4 border rounded bg-white flex flex-col justify-between" tabIndex={0}>
      <div>
        <h3 className="font-semibold text-lg">{launch.name}</h3>
        <p className="text-sm text-gray-600">{date} • Rocket: {launch.rocket || '—'}</p>
        <p className="mt-2 text-sm">{launch.success === null ? 'TBD' : (launch.success ? 'Success' : 'Failure')}</p>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div>
          <button onClick={() => onOpen(launch)} className="px-3 py-1 border rounded">View</button>
        </div>
        <div>
          <button onClick={() => toggleFavorite(launch.id)} aria-pressed={isFavorite(launch.id)} aria-label="Toggle favorite">
            {isFavorite(launch.id) ? '★' : '☆'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default LaunchCard
