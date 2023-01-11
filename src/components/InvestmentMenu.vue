<template>
  <q-menu>
    <div class="row no-wrap q-pa-md">
      <div class="column">
        <div class="text-h6">Investition</div>
        <q-input v-model="name" label="Name" />
        <q-input v-model="price" label="Preis" />
        <q-select v-model="year" :options="yearOptions" label="Jahr" />
        <q-btn
          color="primary"
          label="Add"
          push
          size="sm"
          class="q-mt-sm"
          v-close-popup
          @click="newInvestment"
        />
      </div>
    </div>
  </q-menu>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, Ref, ref } from 'vue'
import * as R from 'ramda'
import { BuySomethingFactor } from '@/core/Factors'

const props = defineProps({
  startYear: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update'])
const name: Ref<string> = ref('')
const price: Ref<Number> = ref(10000)
const year: Ref<Number> = ref(props.startYear)
const yearOptions = ref(R.range(props.startYear, 2050))

const newInvestment = () => {
  emit('update', new BuySomethingFactor(name.value, price.value, year.value))
}
</script>
