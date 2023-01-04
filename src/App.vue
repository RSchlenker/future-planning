<template>
  <FuturePredictionChart
    :factors="factors"
    :start-year="2024"
    :end-year="2044"
    :start-volume="50000"
  />
  <div class="control-panel">
    <q-badge color="secondary"> Hauskauf: {{ hausKaufDatum }} </q-badge>
    <q-slider
      v-model="hausKaufDatum"
      :min="2024"
      :max="2044"
      @change="createChart"
    />
  </div>
</template>
<script setup lang="ts">
import LineChart from '@/components/LineChart.vue'
import { defineComponent, ref } from 'vue'
import * as R from 'ramda'
import FuturePredictionChart from '@/components/FuturePredictionChart.vue'
import {
  buySomething,
  etfs,
  fromYear,
  interestRate,
  monthlyIncome,
  monthlyIncomeWithYearlyChange,
  monthlyOutcome,
  monthlyOutcomeWithYearlyChange,
  outcome,
  reduce,
  reducedDuring,
  untilYear,
} from '@/core/finances'

defineComponent({ LineChart })

const incomeRobin = reduce(
  1,
  reducedDuring(
    2027,
    2029,
    0.5,
    monthlyIncomeWithYearlyChange(3800, 0.02, 2024),
  ),
)
const incomeMaren = reduce(
  1,
  reducedDuring(2027, 2034, 0.4, monthlyIncome(3000)),
)
const miete = untilYear(2029, monthlyOutcomeWithYearlyChange(1400, 0.02, 2024))
const hausUnterhalt = fromYear(2020, monthlyOutcome(300))
const unterhalt = monthlyOutcomeWithYearlyChange(1000, 0.03, 2024)
const kind1 = fromYear(2027, monthlyOutcome(250))
const kind2 = fromYear(2029, monthlyOutcome(250))
const urlaub = outcome(4000)

const hausKaufDatum = ref(2029)
const hausPreis = ref(700000)

let initialFactors = [
  incomeRobin,
  incomeMaren,
  miete,
  hausUnterhalt,
  unterhalt,
  etfs(0.03),
  interestRate(0.1),
  kind1,
  kind2,
  urlaub,
]

let factors = ref(initialFactors)

const createChart = () => {
  const hauskauf = buySomething(hausPreis.value, hausKaufDatum.value)
  factors.value = R.append(hauskauf, initialFactors as []) as []
}

createChart()
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
  padding: 2rem;
  width: 50%;
}
</style>
