import { predictedChangeAfterYears } from './future.js'
import * as R from 'ramda'

export const etfs = (etfRate) => multiplyWhenPositive(R.__, withRate(etfRate))

const isYear = R.curry((year1, _, year2) => {
  return year1 === year2
})

export const buySomething = (price, year) =>
  R.ifElse(isYear(year), R.subtract(R.__, price), R.identity)

export const interestRate = (rate) => multiplyWhenNegative(R.__, withRate(rate))

export const income = (amount) => R.add(amount)
export const outcome = (amount) => R.subtract(R.__, amount)

export const monthlyOutcome = (outcome) => R.subtract(R.__, 12 * outcome)
export const monthlyIncome = (income) => R.add(12 * income)

export const outcomeWithYearlyChange =
  (outcome, change, startYear) => (money, currentYear) =>
    R.subtract(
      money,
      predictedChangeAfterYears(startYear, currentYear, change, outcome),
    )

export const monthlyOutcomeWithYearlyChange = (outcome, change, startYear) =>
  outcomeWithYearlyChange(12 * outcome, change, startYear)

export const incomeWithYearlyChange =
  (income, change, startYear) => (money, currentYear) =>
    R.add(
      money,
      predictedChangeAfterYears(startYear, currentYear, change, income),
    )

export const monthlyIncomeWithYearlyChange = (income, change, startYear) =>
  incomeWithYearlyChange(12 * income, change, startYear)

export const multiplyWhenPositive = R.ifElse(
  R.gte(R.__, 0),
  R.multiply,
  R.identity,
)

const multiplyWhenNegative = R.ifElse(R.lt(R.__, 0), R.multiply, R.identity)

export const withRate = (rate) => {
  return 1 + rate
}