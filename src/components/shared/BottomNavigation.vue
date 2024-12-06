<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
    <div class="flex justify-around items-center h-16">
      <button 
        @click="$emit('navigate', 'home')"
        class="flex flex-col items-center justify-center w-full h-full"
        :class="{ 'text-green-600': currentRoute === 'home', 'text-gray-400 hover:text-gray-600': currentRoute !== 'home' }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1">Menu</span>
      </button>
      
      <button 
        @click="$emit('navigate', 'cart')"
        class="flex flex-col items-center justify-center w-full h-full relative"
        :class="{ 'text-green-600': currentRoute === 'cart', 'text-gray-400 hover:text-gray-600': currentRoute !== 'cart' }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="text-xs mt-1">Cart</span>
        <span 
          v-if="cartItemCount > 0" 
          class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
        >
          {{ cartItemCount }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  currentRoute: {
    type: String,
    required: true
  },
  cartItemCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['navigate'])
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05);
}
</style> 