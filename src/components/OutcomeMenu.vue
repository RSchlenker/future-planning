<template>
  <q-menu>
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6">Outcome</div>
        <q-input dense class="q-mb-sm" v-model="name" label="Name" />
        <q-input dense class="q-mb-sm" v-model="outcome" label="Amount" />
        <q-input
          dense
          class="q-mb-sm"
          v-model="outcomeChange"
          label="Inflation (yearly)"
        />
        <div class="row no-wrap justify-between">
          <q-select
            size="sm"
            v-model="fromYear"
            :options="yearOptions"
            label="From"
          />
          <q-select
            size="sm"
            v-model="toYear"
            :options="yearOptions"
            label="To"
          />
        </div>
        <q-toggle
          v-model="monthly"
          :label="monthly"
          true-value="monthly"
          false-value="yearly"
        />
        <q-btn
          color="primary"
          label="Add"
          push
          size="sm"
          class="q-mt-sm"
          v-close-popup
          @click="newOutcome"
        />
      </div>
    </div>
  </q-menu>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, Ref, ref } from 'vue'
import { MonthlyOutcomeFactor, YearlyOutcomeFactor } from '@/core/Factors'
import * as R from 'ramda'

const props = defineProps({
  startYear: {
    type: Number,
    required: true,
  },
  endYear: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update'])
const name: Ref<string> = ref('')
const outcome: Ref<Number> = ref(2500)
const outcomeChange: Ref<Number> = ref(0.03)
const monthly: Ref<string> = ref('monthly')
const fromYear: Ref<Number> = ref(props.startYear)
const toYear: Ref<Number> = ref(props.endYear)
const yearOptions: Ref<Number[]> = ref(R.range(props.startYear, props.endYear))

const newOutcome = () => {
  if (monthly.value === 'monthly') {
    emit(
      'update',
      new MonthlyOutcomeFactor(
        name.value,
        outcome.value,
        +outcomeChange.value,
        fromYear.value,
        toYear.value,
      ),
    )
  } else {
    emit(
      'update',
      new YearlyOutcomeFactor(
        name.value,
        outcome.value,
        +outcomeChange.value,
        fromYear.value,
        toYear.value,
      ),
    )
  }
  name.value = ''
  outcome.value = 2500
  outcomeChange.value = 0.03
}
</script>
