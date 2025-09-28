import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ExplorerPage from '../pages/ExplorerPage'
import { FavoritesProvider } from '../context/FavoritesContext'

const mockLaunches = [
  { id: '1', name: 'Alpha Mission', date_utc: '2020-01-01T00:00:00.000Z', success: true, links: {} },
  { id: '2', name: 'Beta Mission', date_utc: '2021-06-01T00:00:00.000Z', success: false, links: {} }
]

beforeEach(() => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockLaunches) }))
})

test('renders list and filters by search', async () => {
  render(<FavoritesProvider><ExplorerPage/></FavoritesProvider>)
  await waitFor(() => expect(screen.getByText(/Alpha Mission/)).toBeInTheDocument())

  const search = screen.getByLabelText(/Search missions/i)
  fireEvent.change(search, { target: { value: 'Beta' } })

  await waitFor(() => expect(screen.queryByText(/Alpha Mission/)).not.toBeInTheDocument())
  expect(screen.getByText(/Beta Mission/)).toBeInTheDocument()
})
