<template>
  <div class="row no-wrap q-mt-md">
    <p class="factor-label">Buying {{ name }} for {{ price }} in {{ year }}</p>
    <q-slider
      v-model="year"
      class="q-mr-md"
      :min="2024"
      :max="2060"
      selection-color="transparent"
      :marker-labels="getYearLabel"
      in
      @change="updateInvestment"
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { BuySomethingFactor } from '@/core/Factors'

const props = defineProps({
  factor: {
    type: BuySomethingFactor,
    required: true,
  },
})

const year = ref(props.factor.year)
const name = ref(props.factor.name)
const price = ref(props.factor.price)
const emit = defineEmits(['update'])

const getYearLabel = (year: number) => {
  return year % 10 === 0 ? year : ' '
}

const updateInvestment = () => {
  emit('update', new BuySomethingFactor(name.value, price.value, year.value))
}
</script>
<style lang="scss">
.factor-label {
  width: 30%;
  margin-bottom: 0;
  align-self: center;
}
</style>
