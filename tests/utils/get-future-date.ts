import { setYear, parseISO } from 'date-fns'

/**
 * Recebe uma data string "2022-08-10" e retorna "2023-08-10"
 */

export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}