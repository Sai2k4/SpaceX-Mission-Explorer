import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ExplorerPage from '../pages/ExplorerPage'
import { FavoritesProvider } from '../context/FavoritesContext'

const mockLaunches = [
  {
    id: '1',
    name: 'Alpha Mission',
    date_utc: '2020-01-01T00:00:00.000Z',
    success: true,
    details: 'Test details',
    links: { patch: { small: 'https://example.com/patch.png' }, wikipedia: 'https://wikipedia.org' }
  }
]

beforeEach(() => {
  // @ts-ignore
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockLaunches) }))
})

test('opens detail modal with content', async () => {
  render(<FavoritesProvider><ExplorerPage/></FavoritesProvider>)
  await waitFor(() => expect(screen.getByText(/Alpha Mission/)).toBeInTheDocument())

  const viewBtn = screen.getByText('View')
  fireEvent.click(viewBtn)

  await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
  expect(screen.getByText(/Test details/)).toBeInTheDocument()
  expect(screen.getByAltText(/Alpha Mission patch/)).toBeInTheDocument()
})
