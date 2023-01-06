<template>
  <canvas ref="lineChart" />
</template>

<script setup>
import { Chart } from 'chart.js/auto'
import { onMounted, ref, defineProps, watch } from 'vue'

const props = defineProps({
  data: Array,
  xAxis: Array,
})

const lineChart = ref(null)
let chartObject

onMounted(() => {
  chartObject = new Chart(lineChart.value, {
    type: 'line',
    data: {
      labels: props.xAxis,
      datasets: props.data,
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
})

watch(
  () => props.data,
  (newValue) => {
    chartObject.data.datasets = newValue
    chartObject.update('resize')
  },
  { deep: true },
)
</script>
