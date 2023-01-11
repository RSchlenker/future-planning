<template>
  <q-card class="my-card">
    <q-card-section>
      <div @click="buySomethingNew">Dynamic Calculations</div>
      <div class="multi-input">
        <q-btn>
          Neue Investition
          <InvestmentMenu @update="buySomethingNew" :start-year="2024" />
        </q-btn>
      </div>
      <div v-for="(field, index) in dynamicFields" :key="index">
        <div v-if="field instanceof BuySomethingFactor">
          Buying {{ field.name }} for {{ field.price }} in {{ field.year }}
        </div>
        <div v-else>{{ field.name }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { defineEmits, Ref, ref } from 'vue'
import InvestmentMenu from '@/components/InvestmentMenu.vue'
import { BuySomethingFactor, DynamicFactor } from '@/core/Factors'

const emit = defineEmits(['change'])

let dynamicFields: Ref<DynamicFactor[]> = ref([])

const buySomethingNew = (newFactor: BuySomethingFactor) => {
  dynamicFields.value.push(newFactor)
  emit(
    'change',
    dynamicFields.value.map((field) => field.factor),
  )
}
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
