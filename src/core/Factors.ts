import { buySomething, monthlyIncomeWithYearlyChange } from '@/core/finances'

export interface DynamicFactor {
  id: string
  factor: Function | never
  name: string
}

export class IncomeFactor implements DynamicFactor {
  id: string
  name: string
  amount: Number
  factor: Function

  constructor(name: string, amount: Number, change: Number, startYear: Number) {
    this.id = 'income'
    this.name = name
    this.amount = amount
    this.factor = monthlyIncomeWithYearlyChange(amount, change, startYear)
  }
}

export class BuySomethingFactor implements DynamicFactor {
  id: string
  name: string
  price: Number
  year: Number
  factor: Function
  constructor(name: string, price: Number, year: Number) {
    this.id = 'buy-id'
    this.name = name
    this.price = price
    this.year = year
    this.factor = buySomething(price, year)
  }
}
