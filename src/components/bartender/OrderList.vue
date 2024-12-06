<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Narudžbine</h2>
    <div class="space-y-4">
      <OrderItem
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @complete="handleComplete"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import OrderItem from './OrderItem.vue'

defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['order-completed'])

const handleComplete = (orderId) => {
  emit('order-completed', orderId)
}
</script> 