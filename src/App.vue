<template>
  <FuturePredictionChart
    :factors="factors"
    :start-year="2024"
    :end-year="2060"
    :start-volume="50000"
  />
  <div class="control-panel">
    <living-costs-panel @change="updateLivingCosts" :start-year="2024" />
    <income-panel @change="updateIncome" :start-year="2024" />
  </div>
</template>
<script setup lang="ts">
import LineChart from '@/components/LineChart.vue'
import LivingCostsPanel from '@/components/LivingCostsPanel.vue'
import IncomePanel from '@/components/IncomePanel.vue'
import { defineComponent, ref } from 'vue'
import FuturePredictionChart from '@/components/FuturePredictionChart.vue'
import {
  etfs,
  fromYear,
  interestRate,
  monthlyOutcome,
  monthlyOutcomeWithYearlyChange,
  outcome,
} from '@/core/finances'

defineComponent({ LineChart, LivingCostsPanel, IncomePanel })

const unterhalt = monthlyOutcomeWithYearlyChange(1000, 0.03, 2024)
const kind1 = fromYear(2027, monthlyOutcome(250))
const kind2 = fromYear(2029, monthlyOutcome(250))
const urlaub = outcome(4000)

let initialFactors = [
  unterhalt,
  etfs(0.03),
  interestRate(0.1),
  kind1,
  kind2,
  urlaub,
]

let factors = ref(initialFactors)

let livingCostsStored: any = []
let incomeStored: any = []

const updateLivingCosts = (livingCosts: any) => {
  livingCostsStored = livingCosts
  console.log('living costs changed', livingCosts)
  console.log(incomeStored)
  factors.value = [...livingCosts, ...initialFactors, ...incomeStored]
}
const updateIncome = (income: any) => {
  incomeStored = income
  console.log('income changed', income)
  console.log(livingCostsStored)
  factors.value = [...livingCostsStored, ...initialFactors, ...income]
}
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
.control-panel {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
}
</style>
