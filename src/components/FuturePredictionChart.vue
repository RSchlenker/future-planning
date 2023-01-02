<template>
  <LineChart :data="data" :x-axis="labels" />
</template>

<script setup>
import { defineComponent } from 'vue'
import LineChart from '@/components/LineChart'
import WelcomePage from '@/components/WelcomePage'
import { simulate } from '@/core/simulator'
import {
  buySomething,
  etfs,
  interestRate,
  monthlyIncome,
  monthlyIncomeWithYearlyChange,
  monthlyOutcomeWithYearlyChange,
} from '@/core/finances'

const factors = [
  monthlyIncomeWithYearlyChange(3500, 0.03, 2022),
  monthlyIncome(2750),
  monthlyOutcomeWithYearlyChange(1400, 0.02, 2022),
  monthlyOutcomeWithYearlyChange(1000, 0.03, 2022),
  buySomething(700000, 2026),
  etfs(0.03),
  interestRate(0.1),
]
const simulationResult = simulate(factors, 2022, 2042, 50000)
const labels = simulationResult.map((res) => res.year)
const data = [
  {
    label: 'future',
    data: simulationResult.map((res) => res.volume),
  },
]

defineComponent({ LineChart, WelcomePage })
</script>
