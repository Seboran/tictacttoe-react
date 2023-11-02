'use client'
import { useState } from 'react'
import { TicTacToeGame } from './TicTacToeGame'
import { TictactoeCellValue } from './TictactoeCellValue'
import { WinnerContext } from './WinnerContext'

export function MainContent() {
  const [winner, setWinner] = useState<TictactoeCellValue | null>(null)
  function tictactoeEnumToWinner(winner: TictactoeCellValue) {
    switch (winner) {
      case TictactoeCellValue.X: {
        return 'X'
      }

      case TictactoeCellValue.O: {
        return 'O'
      }
      case TictactoeCellValue.Empty: {
        return 'no one'
      }
    }
  }

  return (
    <div className="relative flex flex-col place-items-center">
      <WinnerContext.Provider value={{ winner, setWinner }}>
        <TicTacToeGame></TicTacToeGame>
        {winner !== null && (
          <span>Winner is {tictactoeEnumToWinner(winner)} </span>
        )}
      </WinnerContext.Provider>
    </div>
  )
}
