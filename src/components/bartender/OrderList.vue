<template>
  <div>
    <!-- Tabs -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        class="flex flex-col items-center p-4 rounded-xl transition-all duration-200" :class="activeTab === tab.value
          ? 'bg-green-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-green-50'">
        <div class="w-12 h-12 rounded-full mb-2 flex items-center justify-center"
          :class="activeTab === tab.value ? 'bg-green-500' : 'bg-green-50'">
          <span class="text-lg font-semibold" :class="activeTab === tab.value ? 'text-white' : 'text-green-600'">
            {{ getOrdersByStatus(tab.value).length }}
          </span>
        </div>
        <span class="text-sm font-medium">{{ tab.name }}</span>
      </button>
    </div>

    <!-- Orders List -->
    <div class="space-y-4">
      <div v-if="getOrdersByStatus(activeTab).length === 0"
        class="text-center text-gray-500 py-8 bg-gray-50 rounded-xl">
        Nema porudžbina u ovoj kategoriji
      </div>

      <div v-for="order in getOrdersByStatus(activeTab)" :key="order.id" class="bg-white rounded-xl shadow-sm p-4">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-semibold">Sto #{{ order.tableId }}</h3>
            <span class="text-sm text-gray-500">{{ formatTime(order.createdAt) }}</span>
          </div>

          <!-- Status Dropdown -->
          <div class="relative">
            <button @click="toggleDropdown(order.id)"
              class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
              :class="{
                'bg-yellow-100 text-yellow-800': order.status === 'Nova',
                'bg-blue-100 text-blue-800': order.status === 'U pripremi',
                'bg-green-100 text-green-800': order.status === 'Završena'
              }">
              {{ order.status }}
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="openDropdown === order.id"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
              <button v-for="status in ['Nova', 'U pripremi', 'Završena']" :key="status"
                @click="updateOrderStatus(order.id, status)"
                class="block w-full px-4 py-2 text-sm text-left hover:bg-gray-50" :class="{
                  'text-yellow-600': status === 'Nova',
                  'text-blue-600': status === 'U pripremi',
                  'text-green-600': status === 'Završena',
                  'font-medium': order.status === status
                }">
                {{ status }}
              </button>
            </div>
          </div>
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

        <!-- Total -->
        <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span class="font-medium">Ukupno:</span>
          <span class="text-lg font-semibold">
            {{ calculateTotal(order).toLocaleString() }} RSD
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['order-completed'])

const tabs = [
  { name: 'Sve', value: 'all' },
  { name: 'Nove', value: 'Nova' },
  { name: 'U pripremi', value: 'U pripremi' },
  { name: 'Završene', value: 'Završena' }
]

const activeTab = ref('all')
const openDropdown = ref(null)

const toggleDropdown = (orderId) => {
  openDropdown.value = openDropdown.value === orderId ? null : orderId
}

const getOrdersByStatus = (status) => {
  let filteredOrders = props.orders.filter(order => order.type === 'drink')

  if (status !== 'all') {
    filteredOrders = filteredOrders.filter(order => order.status === status)
  }

  return filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

const updateOrderStatus = (orderId, newStatus) => {
  emit('order-completed', { orderId, newStatus })
  openDropdown.value = null
}

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('sr-RS', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateTotal = (order) => {
  return order.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}
</script>

<style scoped>
/* Dodajte ako želite transition animacije za dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>