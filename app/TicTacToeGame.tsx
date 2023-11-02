'use client'
import { TicTacToeCell } from './TicTacToeCell'
import { useTictactoeGrid } from './useTictactoeGrid'

export function TicTacToeGame() {
  const { tictactoeGrid, updateCell } = useTictactoeGrid()

  return (
    <table>
      <tbody>
        {tictactoeGrid.map((row, indexRow) => (
          <tr key={indexRow}>
            {row.map((cell, indexCell) => (
              <TicTacToeCell
                key={indexCell}
                cell={cell}
                handleClick={() => updateCell(indexRow, indexCell)}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
