import {
  buySomething,
  etfs,
  income,
  interestRate,
  monthlyIncome,
  monthlyIncomeWithYearlyChange,
  monthlyOutcomeWithYearlyChange,
} from '@/core/finances'
import { simulate } from '@/core/simulator'

it('should simulate a basic scenario over 4 years', () => {
  const factors = [income(1000)]
  const simulationResult = simulate(factors, 2022, 2026, 0)
  expect(simulationResult).toEqual([0, 1000, 2000, 3000, 4000])
})

it('should simulate a more complex scenario over 10 years', () => {
  const factors = [
    monthlyIncomeWithYearlyChange(3500, 0.03, 2022),
    monthlyIncome(2750),
    monthlyOutcomeWithYearlyChange(1400, 0.02, 2022),
    monthlyOutcomeWithYearlyChange(1000, 0.03, 2022),
    buySomething(700000, 2026),
    etfs(0.03),
    interestRate(0.07),
  ]
  const result = simulate(factors, 2022, 2042, 50000)
  expect(result.length).toBe(21)
})
