<template>
  <q-card data-label="dynamic-panel">
    <q-card-section>
      <div>Dynamic Calculations</div>
      <div class="row">
        <q-btn size="sm" class="q-mr-md">
          Neue Investition
          <InvestmentMenu @update="addFactor" :start-year="2024" />
        </q-btn>
        <q-btn size="sm">
          Neues Gehalt
          <IncomeMenu @update="addFactor" :start-year="2024" />
        </q-btn>
      </div>
      <div v-for="(factor, index) in dynamicFields" :key="index">
        <div v-if="factor instanceof BuySomethingFactor">
          <InvestmentDisplay
            @update="updateFactor(index, $event)"
            :factor="factor"
          />
        </div>
        <div v-else-if="factor instanceof IncomeFactor">
          <div class="row no-wrap">
            <p class="factor-label">
              Income {{ factor.name }}: {{ factor.amount }}
            </p>
            <q-linear-progress class="self-center" :value="1" />
          </div>
        </div>
        <div v-else>{{ factor.name }}</div>
        <q-separator />
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { defineEmits, Ref, ref } from 'vue'
import InvestmentMenu from '@/components/InvestmentMenu.vue'
import { BuySomethingFactor, DynamicFactor, IncomeFactor } from '@/core/Factors'
import IncomeMenu from '@/components/IncomeMenu.vue'
import InvestmentDisplay from '@/components/InvestmentDisplay.vue'
import * as R from 'ramda'

const emit = defineEmits(['change'])

let dynamicFields: Ref<DynamicFactor[]> = ref([])

const addFactor = (newFactor: DynamicFactor) => {
  dynamicFields.value.push(newFactor)
  emit(
    'change',
    dynamicFields.value.map((field) => field.factor),
  )
}
const updateFactor = (index: number, newFactor: DynamicFactor) => {
  dynamicFields.value = R.update(index, newFactor, dynamicFields.value)
  emit(
    'change',
    dynamicFields.value.map((field) => field.factor),
  )
}

const buyHouse = new BuySomethingFactor('House', 700000, 2028)
const incomeRobin = new IncomeFactor('Gehalt Robin', 3600, 0.03, 2024)
addFactor(buyHouse)
addFactor(incomeRobin)
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
.factor-label {
  width: 30%;
  margin-bottom: 0;
  align-self: center;
}
</style>
