<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <div v-for="table in tables" :key="table.id"
      class="relative bg-white rounded-2xl shadow-sm cursor-pointer group hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
      :class="{
        'ring-2 ring-green-500 bg-green-50': table.status === 'Slobodan',
        'ring-2 ring-red-500 bg-red-50': table.status === 'Zauzet'
      }">
      <TableItem :table="table" :order="getTableOrder(table.id)" @view-order="viewOrder" />
    </div>
  </div>

  <OrderModal v-if="selectedOrder" :table="{ id: selectedOrder?.tableId }" :order="selectedOrder"
    @close="closeOrderModal" @complete-order="handleOrderComplete" />
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import TableItem from './TableItem.vue'
import OrderModal from './OrderModal.vue'

const props = defineProps({
  tables: {
    type: Array,
    required: true
  },
  orders: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['order-completed'])

const selectedOrder = ref(null)

const viewOrder = (tableId) => {
  const order = getTableOrder(tableId)
  if (order) {
    selectedOrder.value = order
  }
}

const closeOrderModal = () => {
  selectedOrder.value = null
}

const handleOrderComplete = (orderId) => {
  emit('order-completed', orderId)
}

const getTableOrder = (tableId) => {
  return props.orders.find(o => o.tableId === tableId && o.status !== 'Završena')
}
</script>