import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ExplorerPage from '../pages/ExplorerPage'
import { FavoritesProvider } from '../context/FavoritesContext'

const mockLaunches = [
  { id: '1', name: 'Alpha Mission', date_utc: '2020-01-01T00:00:00.000Z', success: true, links: {} }
]

beforeEach(() => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockLaunches) }))
  localStorage.clear()
})

test('toggle favorite persists in localStorage', async () => {
  render(<FavoritesProvider><ExplorerPage/></FavoritesProvider>)
  await waitFor(() => expect(screen.getByText(/Alpha Mission/)).toBeInTheDocument())

  const favButton = screen.getByLabelText('Toggle favorite')
  fireEvent.click(favButton)

  await waitFor(() => expect(localStorage.getItem('spacex_favs')).toContain('1'))
})
