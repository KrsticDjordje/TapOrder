<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Stolovi</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <TableItem
        v-for="table in tables"
        :key="table.id"
        :table="table"
        :order="getTableOrder(table.id)"
        @view-order="viewOrder"
      />
    </div>

    <OrderModal
      v-if="selectedOrder"
      :order="selectedOrder"
      @close="closeOrderModal"
      @complete="completeOrder"
    />
  </div>
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

const getTableOrder = (tableId) => {
  return props.orders.find(o => o.tableId === tableId && o.status === 'Nova')
}

const viewOrder = (tableId) => {
  selectedOrder.value = getTableOrder(tableId)
}

const closeOrderModal = () => {
  selectedOrder.value = null
}

const completeOrder = () => {
  if (selectedOrder.value) {
    emit('order-completed', selectedOrder.value.id)
    closeOrderModal()
  }
}
</script> 