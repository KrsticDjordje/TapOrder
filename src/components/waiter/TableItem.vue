<template>
  <div class="p-6 cursor-pointer"
    @click="props.table.status === 'Zauzet' && props.order && $emit('view-order', props.table.id)">
    <!-- Table Icon -->
    <div class="mb-4 flex justify-center">
      <div class="w-16 h-16 rounded-full flex items-center justify-center" :class="{
        'bg-green-100': props.table.status === 'Slobodan',
        'bg-red-100': props.table.status === 'Zauzet'
      }">
        <svg class="w-8 h-8" :class="{
          'text-green-600': props.table.status === 'Slobodan',
          'text-red-600': props.table.status === 'Zauzet'
        }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    </div>

    <!-- Table Info -->
    <div class="text-center">
      <h3 class="text-lg font-semibold mb-2">Sto #{{ props.table.id }}</h3>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="{
        'bg-green-100 text-green-800': props.table.status === 'Slobodan',
        'bg-red-100 text-red-800': props.table.status === 'Zauzet'
      }">
        {{ props.table.status }}
      </span>
    </div>

    <!-- Active Order Info - Simplified -->
    <div v-if="props.table.status === 'Zauzet' && props.order" class="mt-4 pt-4 border-t border-gray-100 text-center">
      <div class="text-lg font-medium text-gray-900 mb-2">
        <span class="font-medium text-gray-900">
          {{ calculateTotal(props.order).toLocaleString() }} RSD
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
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

const calculateTotal = (order) => {
  if (!order) return 0
  return order.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}
</script>