<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg p-6 max-w-md w-full">
      <h3 class="text-xl font-semibold mb-4">Narudžbina za sto {{ order.tableId }}</h3>
      <ul class="mb-4">
        <li v-for="item in order.items" :key="item.id" class="flex justify-between mb-2">
          <span>{{ item.name }} x {{ item.quantity }}</span>
          <span>{{ item.price * item.quantity }} RSD</span>
        </li>
      </ul>
      <p class="font-semibold">Ukupno: {{ totalPrice }} RSD</p>
      <div class="mt-4 flex justify-end">
        <button
          @click="$emit('close')"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 mr-2"
        >
          Zatvori
        </button>
        <button
          @click="$emit('complete')"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Označi kao završeno
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

defineEmits(['close', 'complete'])

const totalPrice = computed(() => {
  return props.order.items.reduce((total, item) => total + item.price * item.quantity, 0)
})
</script> 