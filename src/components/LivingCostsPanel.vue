<template>
  <q-card class="my-card">
    <q-card-section>
      <div>Living Costs</div>
      <div class="multi-input">
        <q-input
          outlined
          v-model="rent"
          label="Miete"
          @change="updateLivingCosts"
        />
        <q-input
          outlined
          v-model="rentChangeOverYear"
          label="Mietsteigerung"
          @change="updateLivingCosts"
        />
      </div>
      <q-separator />
      <div class="house">
        Hauskauf {{ year }}
        <q-slider
          v-model="year"
          @change="updateLivingCosts"
          :min="2024"
          :max="2060"
        />
      </div>
      <div class="multi-input">
        <q-input
          outlined
          v-model="price"
          label="Hauspreis"
          @change="updateLivingCosts"
        />
        <q-input
          outlined
          v-model="houseMaintenance"
          label="Unterhaltskosten"
          @change="updateLivingCosts"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import {
  buySomething,
  fromYear,
  monthlyOutcome,
  monthlyOutcomeWithYearlyChange,
  untilYear,
} from '@/core/finances'

const props = defineProps({ startYear: Number })
const emit = defineEmits(['change'])

const year = ref(2028)
const price = ref(700000)
const rent = ref(1400)
const rentChangeOverYear = ref(0.02)
const houseMaintenance = ref(400)

const updateLivingCosts = () => {
  const buyHouse = buySomething(price.value, year.value)
  const maintenance = fromYear(
    year.value,
    monthlyOutcome(houseMaintenance.value),
  )
  const monthlyRent = untilYear(
    year.value,
    monthlyOutcomeWithYearlyChange(
      rent.value,
      +rentChangeOverYear.value,
      props.startYear,
    ),
  )
  const costs = [buyHouse, maintenance, monthlyRent]
  emit('change', costs)
}
updateLivingCosts()
</script>
<style lang="scss">
.house {
  display: flex;
  align-items: center;
  padding-top: 1rem;
}
.multi-input {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.5rem;

  * {
    width: 80%;
  }
}
</style>
