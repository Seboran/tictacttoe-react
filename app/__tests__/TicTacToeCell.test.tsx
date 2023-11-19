import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import { TicTacToeCell } from '../TicTacToeCell'
import { TictactoeCellValue } from '../TictactoeCellValue'

function CellWrapper({ children }: { children: React.ReactNode }) {
  return (
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
  )
}

function customRender(ui: React.ReactElement) {
  return render(ui, { wrapper: CellWrapper })
}

afterEach(cleanup)
describe('TicTacToeCell', () => {
  test('should not display a X nor a O', () => {
    const { queryByText } = customRender(
      <TicTacToeCell cell={TictactoeCellValue.Empty} handleClick={() => {}} />,
    )
    expect(queryByText('X')).toBeNull()
    expect(queryByText('O')).toBeNull()
  })
  test.each`
    cellValue               | expectedText
    ${TictactoeCellValue.X} | ${'X'}
    ${TictactoeCellValue.O} | ${'O'}
  `(
    'should display $expectedText when cell is $cellValue',
    ({ cellValue, expectedText }) => {
      const { getByText } = customRender(
        <TicTacToeCell cell={cellValue} handleClick={() => {}} />,
      )
      expect(getByText(expectedText)).toBeDefined()
    },
  )
})
