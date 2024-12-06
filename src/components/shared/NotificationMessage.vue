<template>
  <div
    v-if="show"
    class="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
    :class="{ 'opacity-0 translate-y-4': !show }"
  >
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  show: Boolean,
  message: String
})
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style> 