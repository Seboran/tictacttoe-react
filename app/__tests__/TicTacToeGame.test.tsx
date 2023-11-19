import {
  RenderOptions,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react'
import { ReactElement } from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { TicTacToeGame } from '../TicTacToeGame'
import { TictactoeCellValue } from '../TictactoeCellValue'
import { WinnerContext } from '../WinnerContext'

type TictactoeCellValueOrNull = TictactoeCellValue | null

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  let winner: TictactoeCellValueOrNull = null
  function setWinner(winner: TictactoeCellValueOrNull) {
    winner = winner
  }

  return (
    <WinnerContext.Provider value={{ winner, setWinner }}>
      {children}
    </WinnerContext.Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

describe('TicTacToeGame', () => {
  afterEach(() => {})

  beforeEach(() => {
    vi.resetAllMocks()
    cleanup()
  })
  test('should display a 3x3 grid', () => {
    const { getAllByRole } = customRender(<TicTacToeGame />)
    // 9 cases
    expect(getAllByRole('cell')).toHaveLength(9)
    // 3 rows
    expect(getAllByRole('row')).toHaveLength(3)
    // 3 cells per row
    expect(getAllByRole('row')[0].getElementsByTagName('td')).toHaveLength(3)
  })
  test("should not display who's the winner", () => {
    const { queryByText } = customRender(<TicTacToeGame />)
    expect(queryByText(/winner/i)).toBeNull()
  })
  test('should display 3 Xs won and 2 Os in a winning game for X', async () => {
    const { getAllByRole, getAllByText } = customRender(<TicTacToeGame />)
    // Ça va être très drôle à tester
    const cells = getAllByRole('cell')

    fireEvent.click(cells[0])
    fireEvent.click(cells[3])
    fireEvent.click(cells[1])
    fireEvent.click(cells[4])
    fireEvent.click(cells[2])

    expect(getAllByText('X')).toHaveLength(3)
    expect(getAllByText('O')).toHaveLength(2)
  })

  test('should display O won after failed game', async () => {
    const { getAllByRole, getAllByText, baseElement } = customRender(
      <TicTacToeGame />,
    )

    const cells = getAllByRole('cell')
    fireEvent.click(cells[0])
    fireEvent.click(cells[3])
    fireEvent.click(cells[1])
    fireEvent.click(cells[4])
    fireEvent.click(cells[8])
    fireEvent.click(cells[5])

    const casesX = getAllByText('X')
    expect(casesX).toHaveLength(3)
    const casesO = getAllByText('O')
    expect(casesO).toHaveLength(3)
  })
})
