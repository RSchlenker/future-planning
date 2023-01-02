<template>
  <WelcomePage />
  <FuturePredictionChart />
</template>
<script setup lang="ts">
import WelcomePage from './components/WelcomePage.vue'
import LineChart from '@/components/LineChart.vue'
import { defineComponent } from 'vue'
import FuturePredictionChart from '@/components/FuturePredictionChart.vue'

defineComponent({ LineChart, WelcomePage })
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
