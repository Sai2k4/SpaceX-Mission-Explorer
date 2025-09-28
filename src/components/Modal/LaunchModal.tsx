import React from 'react'
import type { Launch } from '../../types'

type Props = {
  launch: Launch | null
  onClose: () => void
}

const LaunchModal: React.FC<Props> = ({ launch, onClose }) => {
  if (!launch) return null
  const patch = launch.links?.patch?.small ?? null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white max-w-2xl w-full p-6 rounded" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button onClick={onClose} className="float-right">Close</button>
        <div className="flex gap-4">
          {patch && <img src={patch} alt={`${launch.name} patch`} className="w-24 h-24 object-contain" />}
          <div>
            <h2 className="text-xl font-bold">{launch.name}</h2>
            <p className="text-sm mt-2">{launch.details || 'No description available.'}</p>
            <div className="mt-3 space-x-2">
              {launch.links?.webcast && <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="underline">Webcast</a>}
              {launch.links?.wikipedia && <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="underline">Wikipedia</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LaunchModal
