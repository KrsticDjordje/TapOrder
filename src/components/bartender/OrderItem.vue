<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-semibold">Sto #{{ order.tableId }}</h3>
        <span class="text-sm text-gray-500">{{ formatTime(order.createdAt) }}</span>
      </div>
      <span class="px-2 py-1 rounded-full text-sm" :class="{
        'bg-yellow-100 text-yellow-800': order.status === 'Nova',
        'bg-green-100 text-green-800': order.status === 'Završena'
      }">
        {{ order.status }}
      </span>
    </div>

    <!-- Order Items -->
    <div class="space-y-3">
      <div v-for="item in order.items" :key="item.id" class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover">
          <div>
            <p class="font-medium">{{ item.name }}</p>
            <p class="text-sm text-gray-500">
              {{ item.size }} • {{ item.quantity }}x
            </p>
          </div>
        </div>
        <span class="font-medium">
          {{ (item.price * item.quantity).toLocaleString() }} RSD
        </span>
      </div>
    </div>

    <!-- Total and Action -->
    <div class="mt-4 pt-4 border-t border-gray-100">
      <div class="flex justify-between items-center mb-4">
        <span class="font-medium">Ukupno:</span>
        <span class="text-lg font-semibold">
          {{ calculateTotal().toLocaleString() }} RSD
        </span>
      </div>

      <button v-if="order.status !== 'Završena'" @click="$emit('complete', order.id)" class="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 
          transition-colors duration-200">
        Označi kao završeno
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

defineEmits(['complete'])

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('sr-RS', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateTotal = () => {
  return props.order.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}
</script>