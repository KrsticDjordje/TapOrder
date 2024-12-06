<template>
  <div class="fixed inset-0 z-50 overflow-hidden">
    <!-- Overlay with fade -->
    <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
      :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }" @click="$emit('close')">
    </div>

    <!-- Content with slide up -->
    <div class="absolute inset-0 bg-white transform transition-transform duration-300 ease-out"
      :class="{ 'translate-y-full': !isOpen, 'translate-y-0': isOpen }">
      <div class="relative h-full overflow-y-auto pb-24">
        <!-- Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button @click="$emit('close')" class="p-2 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 class="text-xl font-bold text-gray-900">Sto #{{ table.id }}</h2>
              <span class="text-sm text-gray-500">{{ formatTime(order.createdAt) }}</span>
            </div>
          </div>
          <span :class="{
            'bg-yellow-100 text-yellow-800': order.status === 'Nova',
            'bg-green-100 text-green-800': order.status === 'Završena'
          }" class="px-3 py-1 rounded-full text-sm font-medium">
            {{ order.status }}
          </span>
        </div>

        <!-- Order Items -->
        <div class="p-4">
          <div class="space-y-4">
            <div v-for="item in order.items" :key="item.id"
              class="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <div class="flex items-center space-x-4">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover">
                <div>
                  <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                  <div class="text-sm text-gray-500 space-y-1">
                    <p>Veličina: {{ item.size }}</p>
                    <p>Količina: {{ item.quantity }}x</p>
                  </div>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium text-gray-900">
                  {{ (item.price * item.quantity).toLocaleString() }} RSD
                </p>
                <p class="text-sm text-gray-500">{{ item.price.toLocaleString() }} RSD/kom</p>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="mt-6 border-t border-gray-200 pt-4">
            <div class="flex justify-between text-sm text-gray-500 mb-2">
              <span>Međuzbir:</span>
              <span>{{ calculateSubtotal().toLocaleString() }} RSD</span>
            </div>
            <div class="flex justify-between font-medium text-gray-900">
              <span>Ukupno:</span>
              <span>{{ calculateTotal().toLocaleString() }} RSD</span>
            </div>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div class="max-w-2xl mx-auto">
            <button v-if="order.status !== 'Završena'" @click="completeOrder" class="w-full bg-green-600 text-white py-4 rounded-xl font-medium hover:bg-green-700 
                transition-colors duration-200">
              Označi kao završeno
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue'

const props = defineProps({
  table: {
    type: Object,
    required: true
  },
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'complete-order'])
const isOpen = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    isOpen.value = true
  })
})

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('sr-RS', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateSubtotal = () => {
  return props.order.items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

const calculateTotal = () => {
  return calculateSubtotal() // Možete dodati PDV ili druge troškove ovde
}

const completeOrder = () => {
  emit('complete-order', props.order.id)
  emit('close')
}
</script>