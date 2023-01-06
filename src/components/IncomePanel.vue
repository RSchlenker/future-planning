<template>
  <q-card class="my-card">
    <q-card-section>
      <div>Einkommen</div>
      <div class="multi-input">
        <q-input
          outlined
          v-model="incomeRobin"
          label="Income Robin"
          @change="updateIncome"
        />
        <q-input
          outlined
          v-model="incomeChangeRobin"
          label="Steigerung"
          @change="updateIncome"
        />
      </div>
      <div class="multi-input">
        <q-input
          outlined
          v-model="incomeMaren"
          label="Income Maren"
          @change="updateIncome"
        />
        <q-input
          outlined
          v-model="incomeChangeMaren"
          label="Steigerung"
          @change="updateIncome"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import {
  monthlyIncomeWithYearlyChange,
  reduce,
  reducedDuring,
} from '@/core/finances'

const props = defineProps({ startYear: Number })
const emit = defineEmits(['change'])

const incomeRobin = ref(3800)
const incomeChangeRobin = ref(0.03)
const incomeMaren = ref(3000)
const incomeChangeMaren = ref(0)

const updateIncome = () => {
  const incomeR = reduce(
    1,
    reducedDuring(
      2027,
      2029,
      1,
      monthlyIncomeWithYearlyChange(
        incomeRobin.value,
        +incomeChangeRobin.value,
        props.startYear,
      ),
    ),
  )
  const incomeM = reduce(
    1,
    reducedDuring(
      2027,
      2029,
      1,
      monthlyIncomeWithYearlyChange(
        incomeMaren.value,
        +incomeChangeMaren.value,
        props.startYear,
      ),
    ),
  )
  const income = [incomeR, incomeM]
  emit('change', income)
}
updateIncome()
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
