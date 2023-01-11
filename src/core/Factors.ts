import { buySomething } from '@/core/finances'

export interface DynamicFactor {
  id: string
  factor: Function | never
  name: string
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
