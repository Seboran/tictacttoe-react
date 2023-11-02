import { createContext } from 'react'
import { TictactoeCellValue } from './TictactoeCellValue'

export const WinnerContext = createContext<
  | {
      winner: TictactoeCellValue | null
      setWinner: (winner: TictactoeCellValue) => void
    }
  | undefined
>(undefined)
