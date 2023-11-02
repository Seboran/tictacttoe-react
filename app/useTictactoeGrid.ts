import { useContext, useEffect, useState } from 'react'
import { TictactoeCellValue } from './TictactoeCellValue'
import { WinnerContext } from './WinnerContext'

export function useTictactoeGrid() {
  const [tictactoeGrid, setTictactoeGrid] = useState<TictactoeCellValue[][]>([
    [
      TictactoeCellValue.Empty,
      TictactoeCellValue.Empty,
      TictactoeCellValue.Empty,
    ],
    [
      TictactoeCellValue.Empty,
      TictactoeCellValue.Empty,
      TictactoeCellValue.Empty,
    ],
    [
      TictactoeCellValue.Empty,
      TictactoeCellValue.Empty,
      TictactoeCellValue.Empty,
    ],
  ])

  const [currentPlayer, setCurrentPlayer] = useState<TictactoeCellValue>(
    TictactoeCellValue.X,
  )
  const winnerContext = useContext(WinnerContext)

  if (winnerContext === undefined) {
    throw 'WinnerContext is undefined'
  }

  const { winner, setWinner } = winnerContext

  function flipPlayer() {
    setCurrentPlayer(
      currentPlayer === TictactoeCellValue.X
        ? TictactoeCellValue.O
        : TictactoeCellValue.X,
    )
  }

  function updateCell(rowNumber: number, columnNumber: number) {
    if (isGameOver()) {
      return
    }
    const newGrid = [...tictactoeGrid]

    newGrid[rowNumber][columnNumber] = currentPlayer

    setTictactoeGrid(newGrid)
    flipPlayer()

    function isGameOver() {
      return winner !== null
    }
  }

  function checkWinner(
    grid: TictactoeCellValue[][],
  ): TictactoeCellValue | null {
    const lines = [
      [grid[0][0], grid[0][1], grid[0][2]],
      [grid[1][0], grid[1][1], grid[1][2]],
      [grid[2][0], grid[2][1], grid[2][2]],
      [grid[0][0], grid[1][0], grid[2][0]],
      [grid[0][1], grid[1][1], grid[2][1]],
      [grid[0][2], grid[1][2], grid[2][2]],
      [grid[0][0], grid[1][1], grid[2][2]],
      [grid[0][2], grid[1][1], grid[2][0]],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (a !== TictactoeCellValue.Empty && a === b && a === c) {
        return a
      }
    }

    if (isNullGame()) {
      return TictactoeCellValue.Empty
    }

    return null

    function isNullGame() {
      return grid
        .flatMap((row) => row)
        .every((cell) => cell !== TictactoeCellValue.Empty)
    }
  }
  useEffect(() => {
    const winner = checkWinner(tictactoeGrid)
    if (winner !== null) {
      setWinner(winner)
    }
  }, [tictactoeGrid.flatMap((row) => row)])

  return {
    tictactoeGrid,
    updateCell,
    winner,
  }
}
