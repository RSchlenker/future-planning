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
</template>
<script setup lang="ts">
import LineChart from '@/components/LineChart.vue'
import DynamicPanel from '@/components/DynamicPanel.vue'
import { defineComponent, ref } from 'vue'
import FuturePredictionChart from '@/components/FuturePredictionChart.vue'
import { etfs, interestRate } from '@/core/finances'

defineComponent({ LineChart, DynamicPanel })
let initialFactors = [etfs(0.03), interestRate(0.1)]

let factors = ref(initialFactors)
let dynamicFields: any = []

const regenerateFactors = () => {
  factors.value = [...initialFactors, ...dynamicFields]
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
</style>
