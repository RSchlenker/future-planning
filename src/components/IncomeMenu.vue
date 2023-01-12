<template>
  <q-menu>
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6">Einkommen</div>
        <q-input dense class="q-mb-sm" v-model="name" label="Name" />
        <q-input
          dense
          class="q-mb-sm"
          v-model="income"
          label="Monatseinkommen (Netto)"
        />
        <q-input
          dense
          class="q-mb-sm"
          v-model="incomeChange"
          label="Gehaltsentwicklung (Jährlich)"
        />
        <q-btn
          color="primary"
          label="Add"
          push
          size="sm"
          class="q-mt-sm"
          v-close-popup
          @click="newIncome"
        />
      </div>
    </div>
  </q-menu>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, Ref, ref } from 'vue'
import { IncomeFactor } from '@/core/Factors'

const props = defineProps({
  startYear: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update'])
const name: Ref<string> = ref('')
const income: Ref<Number> = ref(2500)
const incomeChange: Ref<Number> = ref(0.03)

const newIncome = () => {
  emit(
    'update',
    new IncomeFactor(
      name.value,
      income.value,
      +incomeChange.value,
      props.startYear,
    ),
  )
  name.value = ''
  income.value = 2500
  incomeChange.value = 0.03
}
</script>
