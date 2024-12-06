<template>
  <div 
    class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
    @click="$emit('view-details', item)"
  >
    <div class="relative">
      <img 
        :src="item.image" 
        :alt="item.name"
        class="w-full h-32 object-cover rounded-xl"
      >
      <div class="absolute top-2 right-2">
        <div class="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          4.8
        </div>
      </div>
    </div>

    <div class="mt-3">
      <h3 class="font-medium text-gray-900 mb-1">{{ item.name }}</h3>
      <div class="flex items-center text-sm text-gray-500 mb-3">
        <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        20 min
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg font-semibold text-green-600">{{ item.price }} RSD</p>
        <button 
          @click.stop="$emit('add-to-cart', item)"
          class="p-2 rounded-full bg-green-100 hover:bg-green-200 text-green-600 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['add-to-cart', 'view-details'])
</script>

<style scoped>
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style> 