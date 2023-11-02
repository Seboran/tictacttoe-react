import { TictactoeCellValue } from './TictactoeCellValue'

export function TicTacToeCell(props: {
  cell: TictactoeCellValue
  handleClick: () => void
}) {
  const cell = props.cell
  const handleClick = props.handleClick

  function tictacToeCellValueToLetter(cell: TictactoeCellValue) {
    switch (cell) {
      case TictactoeCellValue.X: {
        return 'X'
      }

      case TictactoeCellValue.O: {
        return 'O'
      }
      case TictactoeCellValue.Empty: {
        return ''
      }
    }
  }

  return (
    <td
      className="w-20 h-20 border-2 border-black p-0 hover:cursor-pointer text-center"
      onClick={handleClick}
    >
      {cell !== null && tictacToeCellValueToLetter(cell)}
    </td>
  )
}
