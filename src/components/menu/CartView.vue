<template>
  <div class="h-full bg-gray-50 flex flex-col">
    <!-- Cart Header -->
    <div class="flex items-center space-x-4 mb-6">
      <button 
        @click="$emit('back-to-menu')"
        class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold">Your Cart</h1>
    </div>

    <!-- Cart Empty State -->
    <div v-if="cart.length === 0" class="flex-1 flex flex-col items-center justify-center">
      <div class="w-24 h-24 text-gray-400 mb-4">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <p class="text-gray-500">Your cart is empty</p>
      <button 
        @click="$emit('back-to-menu')"
        class="mt-4 text-emerald-600 font-medium"
      >
        Continue Shopping
      </button>
    </div>

    <!-- Cart Items -->
    <div v-else class="flex-1 flex flex-col">
      <div class="flex-1 space-y-4 overflow-auto pb-32">
        <div 
          v-for="item in cart" 
          :key="item.id"
          class="bg-white rounded-xl p-4 flex items-center space-x-4"
        >
          <img 
            :src="item.image" 
            :alt="item.name"
            class="w-20 h-20 rounded-lg object-cover"
          >
          <div class="flex-1">
            <h3 class="font-medium">{{ item.name }}</h3>
            <p class="text-emerald-600 font-medium">{{ item.price }} RSD</p>
            <div class="flex items-center space-x-4 mt-2">
              <button 
                @click="$emit('remove-item', item)"
                class="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
              >
                <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="font-medium text-gray-900 min-w-[20px] text-center">{{ item.quantity }}</span>
              <button 
                @click="$emit('add-item', item)"
                class="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-colors"
              >
                <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
          <div class="text-right">
            <p class="font-medium text-gray-900">{{ item.price * item.quantity }} RSD</p>
          </div>
        </div>
      </div>

      <!-- Order Summary and Checkout Button -->
      <div class="fixed bottom-20 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">Total Amount</span>
          <span class="text-lg font-semibold text-gray-900">{{ totalPrice }} RSD</span>
        </div>
        <button 
          @click="$emit('place-order')"
          class="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>Place Order</span>
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

defineEmits(['remove-item', 'add-item', 'place-order', 'back-to-menu'])

const totalPrice = computed(() => {
  return props.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
})
</script>

<style scoped>
/* Ensure the cart container takes full height */
.h-full {
  min-height: calc(100vh - theme('spacing.20')); /* Adjust for bottom navigation */
}

/* Add padding to prevent content from being hidden behind fixed button */
.pb-32 {
  padding-bottom: 8rem;
}

/* Custom scrollbar */
.overflow-auto {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.300') theme('colors.gray.100');
}

.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: theme('colors.gray.100');
}

.overflow-auto::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.300');
  border-radius: 3px;
}

/* Dodajemo senku za bolju vidljivost dugmića */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Poboljšavamo tranzicije */
.transition-colors {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style> 