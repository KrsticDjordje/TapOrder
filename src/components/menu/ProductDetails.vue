<template>
  <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50">
    <div class="bg-white h-full overflow-auto">
      <!-- Header -->
      <div class="relative h-64">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
          @click="$emit('close')"
          class="absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div class="absolute bottom-4 left-4 right-4 text-white">
          <div class="flex items-center space-x-2 mb-2">
            <span class="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
              {{ product.category }}
            </span>
            <div class="flex items-center">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="ml-1 text-sm">4.8 (2.2k reviews)</span>
            </div>
          </div>
          <h1 class="text-2xl font-bold">{{ product.name }}</h1>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 space-y-6">
        <!-- Price and Add to Cart -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Price</p>
            <p class="text-2xl font-bold text-gray-900">{{ product.price }} RSD</p>
          </div>
          <button 
            @click="addToCart"
            class="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <span>Add to Cart</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        <!-- Preparation Time -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Preparation Time</h2>
          <div class="flex items-center text-gray-600">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>15-20 minutes</span>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Description</h2>
          <p class="text-gray-600 leading-relaxed">
            {{ product.description || 'No description available.' }}
          </p>
        </div>

        <!-- Ingredients -->
        <div>
          <h2 class="text-lg font-semibold mb-2">Ingredients</h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="ingredient in product.ingredients" 
              :key="ingredient"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {{ ingredient }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'add-to-cart'])

const addToCart = () => {
  emit('add-to-cart', props.product)
}
</script> 