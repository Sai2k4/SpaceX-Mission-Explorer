import React, { useMemo, useState } from 'react'
import useLaunches from '../hooks/useLaunches'
import useDebounce from '../hooks/useDebounce'
import Filters from '../components/Filters/Filters'
import LaunchCard from '../components/Card/LaunchCard'
import LaunchModal from '../components/Modal/LaunchModal'
import SkeletonCard from '../components/Common/SkeletonCard'
import type { Launch } from '../types'

const ExplorerPage: React.FC = () => {
  const { data, loading, error } = useLaunches()
  const [search, setSearch] = useState('')
  const [year, setYear] = useState('')
  const [onlySuccess, setOnlySuccess] = useState(false)
  const [selected, setSelected] = useState<Launch | null>(null)

  const debouncedSearch = useDebounce(search, 300)

  const yearsOptions = useMemo(() => {
    if (!data) return []
    const setYears = new Set<number>(data.map(l => new Date(l.date_utc).getUTCFullYear()))
    return Array.from(setYears).sort((a,b) => b - a)
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    let res = data
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase()
      res = res.filter(l => l.name?.toLowerCase().includes(s))
    }
    if (year) res = res.filter(l => new Date(l.date_utc).getUTCFullYear().toString() === year)
    if (onlySuccess) res = res.filter(l => l.success === true)
    return res
  }, [data, debouncedSearch, year, onlySuccess])

  return (
    <div>
      <Filters search={search} setSearch={setSearch} year={year} setYear={setYear} onlySuccess={onlySuccess} setOnlySuccess={setOnlySuccess} yearsOptions={yearsOptions} />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading && new Array(6).fill(0).map((_,i) => <SkeletonCard key={i} />)}
        {error && <div className="col-span-full text-red-600">Error: {error}</div>}
        {!loading && !error && filtered.length === 0 && <div className="col-span-full">No launches found.</div>}
        {!loading && !error && filtered.map(l => <LaunchCard key={l.id} launch={l} onOpen={(launch) => setSelected(launch)} />)}
      </div>

      <LaunchModal launch={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

export default ExplorerPage
