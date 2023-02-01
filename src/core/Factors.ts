import {
  buySomething,
  fromToYear,
  monthlyIncomeWithYearlyChange,
  monthlyOutcomeWithYearlyChange,
  outcome,
  outcomeWithYearlyChange,
} from '@/core/finances'

export interface DynamicFactor {
  factor: Function | never
  name: string
}

export class OutcomeFactor implements DynamicFactor {
  name: string
  amount: Number
  changeRate: Number
  from: Number
  to: Number
  monthly: Boolean
  factor: Function
  constructor(
    name: string,
    amount: Number,
    change: Number,
    startYear: Number,
    endYear: Number,
  ) {
    this.name = name
    this.amount = amount
    this.from = startYear
    this.to = endYear
    this.changeRate = change
    this.monthly = false
    this.factor = outcome(amount)
  }
}

export class MonthlyOutcomeFactor extends OutcomeFactor {
  constructor(
    name: string,
    amount: Number,
    change: Number,
    startYear: Number,
    endYear: Number,
  ) {
    super(name, amount, change, startYear, endYear)
    this.factor = fromToYear(
      startYear,
      endYear,
      monthlyOutcomeWithYearlyChange(amount, change, startYear),
    )
    this.monthly = true
  }
}

export class YearlyOutcomeFactor extends OutcomeFactor {
  constructor(
    name: string,
    amount: Number,
    change: Number,
    startYear: Number,
    endYear: Number,
  ) {
    super(name, amount, change, startYear, endYear)
    this.factor = fromToYear(
      startYear,
      endYear,
      outcomeWithYearlyChange(amount, change, startYear),
    )
  }
}

export class IncomeFactor implements DynamicFactor {
  name: string
  amount: Number
  factor: Function

  constructor(name: string, amount: Number, change: Number, startYear: Number) {
    this.name = name
    this.amount = amount
    this.factor = monthlyIncomeWithYearlyChange(amount, change, startYear)
  }
}

export class BuySomethingFactor implements DynamicFactor {
  name: string
  price: Number
  year: Number
  factor: Function
  constructor(name: string, price: Number, year: Number) {
    this.name = name
    this.price = price
    this.year = year
    this.factor = buySomething(price, year)
  }
}
