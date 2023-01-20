<template>
  <FuturePredictionChart
    :factors="factors"
    :start-year="2024"
    :end-year="2060"
    :start-volume="50000"
  />
  <dynamic-panel
    @change="updateDynamicValues"
    class="q-mt-md"
    :start-year="2024"
  />
  <div class="control-panel" v-if="false">
    <living-costs-panel @change="updateLivingCosts" :start-year="2024" />
    <income-panel @change="updateIncome" :start-year="2024" />
  </div>
</template>
<script setup lang="ts">
import LineChart from '@/components/LineChart.vue'
import LivingCostsPanel from '@/components/LivingCostsPanel.vue'
import DynamicPanel from '@/components/DynamicPanel.vue'
import IncomePanel from '@/components/IncomePanel.vue'
import { defineComponent, ref } from 'vue'
import FuturePredictionChart from '@/components/FuturePredictionChart.vue'
import { etfs, interestRate } from '@/core/finances'

defineComponent({ LineChart, LivingCostsPanel, IncomePanel, DynamicPanel })
let initialFactors = [etfs(0.03), interestRate(0.1)]

let factors = ref(initialFactors)

let livingCostsStored: any = []
let incomeStored: any = []
let dynamicFields: any = []

const regenerateFactors = () => {
  factors.value = [
    ...initialFactors,
    ...incomeStored,
    ...livingCostsStored,
    ...dynamicFields,
  ]
}

const updateLivingCosts = (livingCosts: any) => {
  livingCostsStored = livingCosts
  regenerateFactors()
}
const updateIncome = (income: any) => {
  incomeStored = income
  regenerateFactors()
}
const updateDynamicValues = (newFields: any) => {
  dynamicFields = newFields
  regenerateFactors()
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
