<template>
  <WelcomePage />
  <FuturePredictionChart
    :factors="factors"
    :start-year="2022"
    :end-year="2042"
    :start-volume="50000"
  />
</template>
<script setup lang="ts">
import WelcomePage from './components/WelcomePage.vue'
import LineChart from '@/components/LineChart.vue'
import { defineComponent } from 'vue'
import FuturePredictionChart from '@/components/FuturePredictionChart.vue'
import {
  buySomething,
  etfs,
  interestRate,
  monthlyIncome,
  monthlyIncomeWithYearlyChange,
  monthlyOutcomeWithYearlyChange,
} from '@/core/finances'

defineComponent({ LineChart, WelcomePage })

const factors = [
  monthlyIncomeWithYearlyChange(3500, 0.03, 2022),
  monthlyIncome(2750),
  monthlyOutcomeWithYearlyChange(1400, 0.02, 2022),
  monthlyOutcomeWithYearlyChange(1000, 0.03, 2022),
  buySomething(700000, 2026),
  etfs(0.03),
  interestRate(0.1),
]
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
