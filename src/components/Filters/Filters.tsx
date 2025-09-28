import React from 'react'

type Props = {
  search: string
  setSearch: (s: string) => void
  year: string
  setYear: (y: string) => void
  onlySuccess: boolean
  setOnlySuccess: (b: boolean) => void
  yearsOptions?: (string | number)[]
}

const Filters: React.FC<Props> = ({ search, setSearch, year, setYear, onlySuccess, setOnlySuccess, yearsOptions = [] }) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="md:flex md:items-end md:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Search</label>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search mission name..." className="mt-1 p-2 w-full border rounded" aria-label="Search missions" />
        </div>

        <div className="mt-3 md:mt-0">
          <label className="block text-sm font-medium">Year</label>
          <select value={year} onChange={e => setYear(e.target.value)} className="mt-1 p-2 border rounded">
            <option value="">All years</option>
            {yearsOptions.map(y => <option key={String(y)} value={String(y)}>{String(y)}</option>)}
          </select>
        </div>

        <div className="flex items-center mt-3 md:mt-0">
          <input id="successOnly" type="checkbox" checked={onlySuccess} onChange={e => setOnlySuccess(e.target.checked)} />
          <label htmlFor="successOnly" className="ml-2">Successful only</label>
        </div>
      </div>
    </div>
  )
}

export default Filters
