import {
  multiplyWhenPositive,
  etfs,
  buySomething,
  interestRate,
  monthlyIncome,
  monthlyOutcome,
  monthlyOutcomeWithYearlyChange,
  monthlyIncomeWithYearlyChange,
  income,
  incomeWithYearlyChange,
  outcomeWithYearlyChange,
  outcome,
} from '@/core/finances'
import { multipleYears } from '@/core/future'
import * as R from 'ramda'

it('should calculate positive ETFs', () => {
  const after4Years = multipleYears([etfs(0.03)], 2022, 4, 2000)
  expect(after4Years).toBe(2000 * 1.03 * 1.03 * 1.03 * 1.03)
})

it('should only multiply when positive', () => {
  expect(R.gte(0, 2))
  expect(multiplyWhenPositive(2, 2)).toBe(4)
  expect(multiplyWhenPositive(-2, 2)).toBe(-2)
})

it('should not apply ETFs when negative', () => {
  const after4Years = multipleYears([etfs(0.05)], 2022, 4, -2000)
  expect(after4Years).toBe(-2000)
})

it('Should buy house after 2 years', () => {
  const boughtHouse = multipleYears(
    [etfs(0.03), buySomething(5000, 2023)],
    2022,
    4,
    2000,
  )
  expect(boughtHouse).toBe(2000 * 1.03 * 1.03 - 5000)
})

it('Should calculate interest rate when negative', () => {
  const after2Years = multipleYears([interestRate(0.05)], 2022, 2, -2000)
  expect(after2Years).toBe(-2000 * 1.05 * 1.05)
})

it('Should add monthly income', () => {
  const after3Years = multipleYears([monthlyIncome(2000)], 2022, 3, 0)
  expect(after3Years).toBe(12 * 3 * 2000)
})

it('Should subtract monthly outcome', () => {
  const after3Years = multipleYears([monthlyOutcome(200)], 2022, 3, 10000)
  expect(after3Years).toBe(10000 - 12 * 3 * 200)
})

it('Should increase monthly outcome every year', () => {
  const after3Years = multipleYears(
    [monthlyOutcomeWithYearlyChange(200, 0.05, 2022)],
    2022,
    3,
    10000,
  )
  expect(after3Years).toBe(
    10000 - 12 * 200 - 12 * 200 * 1.05 - 12 * 200 * 1.05 * 1.05,
  )
})

it('Should increase yearly outcome every year', () => {
  const after3Years = multipleYears(
    [outcomeWithYearlyChange(200, 0.05, 2022)],
    2022,
    3,
    10000,
  )
  expect(after3Years).toBe(10000 - 200 - 200 * 1.05 - 200 * 1.05 * 1.05)
})

it('Should increase monthly income every year', () => {
  const after3Years = multipleYears(
    [monthlyIncomeWithYearlyChange(200, 0.05, 2022)],
    2022,
    3,
    0,
  )
  expect(after3Years).toBe(12 * 200 + 12 * 200 * 1.05 + 12 * 200 * 1.05 * 1.05)
})

it('Should add yearly income', () => {
  const after3Years = multipleYears([income(200)], 2020, 3, 0)
  expect(after3Years).toBe(600)
})

it('Should subtract yearly outcome', () => {
  const after3Years = multipleYears([outcome(200)], 2020, 3, 10000)
  expect(after3Years).toBe(10000 - 200 - 200 - 200)
})

it('Should increase yearly income every year', () => {
  const after3Years = multipleYears(
    [incomeWithYearlyChange(200, 0.05, 2020)],
    2020,
    3,
    0,
  )
  expect(after3Years).toBe(200 + 200 * 1.05 + 200 * 1.05 * 1.05)
})
