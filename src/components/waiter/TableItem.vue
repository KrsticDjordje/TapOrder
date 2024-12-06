<template>
  <div
    class="bg-white rounded-lg shadow p-4 flex flex-col items-center"
    :class="{ 'bg-red-100': table.status === 'Zauzet' }"
  >
    <h3 class="font-semibold mb-2">Sto {{ table.id }}</h3>
    <p :class="{ 'text-red-500': table.status === 'Zauzet', 'text-green-500': table.status === 'Slobodan' }">
      {{ table.status }}
    </p>
    <button
      v-if="table.status === 'Zauzet'"
      @click="$emit('view-order', table.id)"
      class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
    >
      Pregledaj narudžbinu
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  table: {
    type: Object,
    required: true
  },
  order: {
    type: Object,
    default: null
  }
})

defineEmits(['view-order'])
</script> 