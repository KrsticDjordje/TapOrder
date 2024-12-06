<template>
  <div class="fixed inset-0 z-50 overflow-hidden">
    <!-- Overlay with fade -->
    <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
      :class="{ 'opacity-0': !isOpen, 'opacity-100': isOpen }" @click="$emit('close')">
    </div>

    <!-- Content with slide up -->
    <div class="absolute inset-0 bg-white transform transition-transform duration-300 ease-out"
      :class="{ 'translate-y-full': !isOpen, 'translate-y-0': isOpen }">
      <div class="relative h-full overflow-y-auto pb-32">
        <!-- Close button -->
        <button @click="$emit('close')" class="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-lg">
          <svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Favorite button -->
        <button class="absolute top-4 right-4 z-10">
          <svg class="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <!-- Product Image -->
        <div class="relative h-96 bg-gray-100">
          <img :src="product.image" :alt="product.name" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <span class="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
              {{ product.category }}
            </span>
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-6 max-w-2xl mx-auto">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ product.name }}</h2>
              <div class="flex items-center mt-1">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-600">{{ product.rating }}</span>
                </div>
                <span class="mx-2 text-gray-300">•</span>
                <span class="text-sm text-gray-600">{{ product.calories }} calories</span>
              </div>
            </div>
            <div class="text-xl font-bold text-gray-900">
              {{ product.price.toLocaleString() }} RSD
            </div>
          </div>

          <p class="text-gray-600 mb-6">{{ product.description }}</p>

          <!-- Ingredients -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Ingredients</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="ingredient in product.ingredients" :key="ingredient"
                class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {{ ingredient }}
              </span>
            </div>
          </div>

          <!-- Preparation Time -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Preparation Time</h3>
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ product.preparationTime || '15-20 minutes' }}</span>
            </div>
          </div>

          <!-- Size Selection -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Coffee Size</h3>
            <div class="flex space-x-3">
              <button v-for="size in ['small', 'medium', 'large']" :key="size"
                class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                :class="selectedSize === size ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                @click="selectedSize = size">
                {{ size }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Fixed bottom controls -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div class="max-w-2xl mx-auto flex items-center space-x-4">
          <!-- Quantity Controls -->
          <div class="flex items-center space-x-3 bg-gray-100 px-4 py-2 rounded-xl">
            <button @click="decrementQuantity"
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="text-lg font-medium text-gray-900 w-8 text-center">{{ quantity }}</span>
            <button @click="incrementQuantity"
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          <!-- Add to Cart Button -->
          <button @click="addToCart" class="flex-1 bg-green-600 text-white py-4 rounded-xl font-medium hover:bg-green-700 
              transition-colors duration-200 flex items-center justify-center space-x-2">
            <span>Add to cart</span>
            <span>•</span>
            <span>{{ (product.price * (sizeMultiplier[selectedSize] || 1) * quantity).toLocaleString() }} RSD</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'add-to-cart'])

const selectedSize = ref('medium')
const quantity = ref(1)
const isOpen = ref(false)

const sizeMultiplier = {
  small: 0.8,
  medium: 1,
  large: 1.2
}

// Pokreni animaciju nakon montiranja komponente
onMounted(() => {
  requestAnimationFrame(() => {
    isOpen.value = true
  })
})

const incrementQuantity = () => {
  if (quantity.value < 10) quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const addToCart = () => {
  emit('add-to-cart', {
    ...props.product,
    size: selectedSize.value,
    price: props.product.price * sizeMultiplier[selectedSize.value],
    quantity: quantity.value
  })
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Smooth scrolling */
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}
</style>