<template>
  <div class="row no-wrap">
    <p class="factor-label">
      {{ name }}: {{ price }} ({{ iterationType }})
      <br />
      from {{ timeRange.min }} to {{ timeRange.max }}
    </p>
    <q-range
      v-model="timeRange"
      class="q-mr-md"
      :min="2024"
      :max="2060"
      :marker-labels="getYearLabel"
      in
      @change="updateOutcome"
    />
  </div>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { MonthlyOutcomeFactor, YearlyOutcomeFactor } from '@/core/Factors'

const props = defineProps({
  factor: {
    type: [MonthlyOutcomeFactor, YearlyOutcomeFactor],
    required: true,
  },
})

const name = ref(props.factor.name)
const price = ref(props.factor.amount)
const change = ref(props.factor.changeRate)
const emit = defineEmits(['update'])
const timeRange = ref({ min: props.factor.from, max: props.factor.to })
const iterationType = props.factor.monthly ? 'monatlich' : 'jährlich'

const getYearLabel = (year: number) => {
  return year % 10 === 0 ? year : ' '
}

const updateOutcome = () => {
  if (props.factor.monthly) {
    emit(
      'update',
      new MonthlyOutcomeFactor(
        name.value,
        price.value,
        change.value,
        timeRange.value.min,
        timeRange.value.max,
      ),
    )
  } else {
    emit(
      'update',
      new YearlyOutcomeFactor(
        name.value,
        price.value,
        change.value,
        timeRange.value.min,
        timeRange.value.max,
      ),
    )
  }
}
</script>
<style lang="scss">
.factor-label {
  width: 30%;
  margin-bottom: 0;
  align-self: center;
}
</style>
