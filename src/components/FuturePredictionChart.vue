<template>
  <div class="chart-wrapper">
    <div class="future-chart">
      <LineChart :data="data" :x-axis="labels" />
    </div>
  </div>
</template>

<script setup>
import { defineComponent, defineProps, ref, watch } from 'vue'
import LineChart from '@/components/LineChart'
import WelcomePage from '@/components/WelcomePage'
import { simulate } from '@/core/simulator'

const props = defineProps({
  factors: Array,
  startYear: Number,
  endYear: Number,
  startVolume: Number,
})

let simulationResult
let labels = ref(null)
let data = ref(null)
const resimulate = () => {
  simulationResult = simulate(
    props.factors,
    props.startYear,
    props.endYear,
    props.startVolume,
  )
  labels.value = simulationResult.map((res) => res.year)
  data = [
    {
      label: 'future',
      data: simulationResult.map((res) => res.volume),
    },
  ]
}

resimulate()
watch(() => props.factors, resimulate, { deep: true })
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
