<template>
  <div class="chart-wrapper">
    <div class="future-chart">
      <LineChart :data="data" :x-axis="labels" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, defineProps } from 'vue'
import LineChart from '@/components/LineChart'
import WelcomePage from '@/components/WelcomePage'
import { simulate } from '@/core/simulator'

const props = defineProps({
  factors: Array,
  startYear: String,
  endYear: String,
  startVolume: Number,
})

const simulationResult = simulate(
  props.factors,
  props.startYear,
  props.endYear,
  props.startVolume,
)
const labels = simulationResult.map((res) => res.year)
const data = [
  {
    label: 'future',
    data: simulationResult.map((res) => res.volume),
  },
]

defineComponent({ LineChart, WelcomePage })
</script>

<style lang="css" scoped>
.chart-wrapper {
  width: 100%;
  margin: auto;
}
.future-chart {
  width: 60%;
  margin: auto;
}
</style>
