import { useEffect, useState } from 'react'
import type { Launch } from '../types'

const LAUNCHES_URL = 'https://api.spacexdata.com/v4/launches'

export default function useLaunches() {
  const [data, setData] = useState<Launch[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(LAUNCHES_URL)
      .then(res => {
        if (!res.ok) throw new Error('Network error')
        return res.json()
      })
      .then((json: Launch[]) => {
        if (!cancelled) {
          const sorted = json.sort((a,b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime())
          setData(sorted)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message || 'Failed to load')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
