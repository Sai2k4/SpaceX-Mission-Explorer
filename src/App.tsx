import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ExplorerPage from './pages/ExplorerPage'
import FavoritesPage from './pages/FavoritesPage'

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SpaceX Mission Explorer</h1>
          <nav className="space-x-4">
            <Link to="/" className="hover:underline">Explorer</Link>
            <Link to="/favorites" className="hover:underline">Favorites</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<ExplorerPage/>} />
          <Route path="/favorites" element={<FavoritesPage/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
