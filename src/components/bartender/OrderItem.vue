<template>
  <div class="bg-white rounded-lg shadow p-4">
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-semibold">Narudžbina #{{ order.id }}</h3>
      <span :class="{
        'bg-yellow-200 text-yellow-800': order.status === 'Nova',
        'bg-green-200 text-green-800': order.status === 'Završena'
      }" class="px-2 py-1 rounded-full text-sm">
        {{ order.status }}
      </span>
    </div>
    <ul class="mb-2">
      <li v-for="item in order.items" :key="item.id" class="flex justify-between">
        <span>{{ item.name }} x {{ item.quantity }}</span>
        <span>{{ item.price * item.quantity }} RSD</span>
      </li>
    </ul>
    <p class="font-semibold">Ukupno: {{ totalPrice }} RSD</p>
    <button
      v-if="order.status === 'Nova'"
      @click="$emit('complete', order.id)"
      class="mt-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
    >
      Označi kao završeno
    </button>
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

defineEmits(['complete'])

const totalPrice = computed(() => {
  return props.order.items.reduce((total, item) => total + item.price * item.quantity, 0)
})
</script> 