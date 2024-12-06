<template>
  <div class="pb-20">
    <div v-if="currentView === 'home'">
      <!-- Header Section -->
      <div class="mb-6">

        <!-- Search Bar -->
        <div class="relative mb-6 mx-auto max-w-md">
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Pretraži proizvode..." class="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 text-gray-900 text-sm 
                placeholder-gray-500 shadow-sm outline-none transition-all duration-300 ease-in-out
                focus:border-green-500 focus:shadow-green-glow"
              :class="{ 'border-green-500 shadow-green-glow': searchQuery }">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 transition-colors duration-300"
                :class="searchQuery ? 'text-green-500' : 'text-gray-400'" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-500
                transition-colors duration-300">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Categories -->
        <div class="grid grid-cols-4 gap-4 mb-8">
          <button v-for="category in categories" :key="category" @click="selectedCategory = category"
            class="flex flex-col items-center p-4 rounded-xl transition-all duration-200"
            :class="selectedCategory === category ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-green-50'">
            <div class="w-12 h-12 rounded-full mb-2 flex items-center justify-center"
              :class="selectedCategory === category ? 'bg-green-500' : 'bg-green-50'">
              <img :src="getCategoryIcon(category)" class="w-6 h-6">
            </div>
            <span class="text-sm font-medium">{{ category }}</span>
          </button>
        </div>

        <!-- Recommended Slider -->
        <RecommendedSlider :items="recommendedItems" @add-to-cart="addToCart" class="mb-8" />

        <!-- Popular Items -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Popular Items</h2>
            <button class="text-sm font-medium text-green-600 hover:text-green-700">
              See All
            </button>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <MenuItem v-for="item in filteredAndSortedMenu" :key="item.id" :item="item" @add-to-cart="addToCart"
              @view-details="showProductDetails" />
          </div>
        </div>
      </div>
    </div>

    <!-- Cart View kao zaseban prikaz -->
    <div v-else-if="currentView === 'cart'" class="h-full">
      <CartView :cart="cart" @remove-item="removeFromCart" @add-item="addToCart" @place-order="handlePlaceOrder"
        @back-to-menu="currentView = 'home'" />
    </div>

    <!-- Cart Floating Button -->
    <button v-if="cartItemCount > 0 && currentView === 'home'" @click="currentView = 'cart'"
      class="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3.5 rounded-full shadow-lg flex items-center space-x-3 hover:bg-green-700 transition-colors duration-200">
      <span class="font-medium">Cart • {{ cartItemCount }} items</span>
      <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
    </button>

    <!-- Bottom Navigation -->
    <BottomNavigation :current-route="currentView" :cart-item-count="cartItemCount" @navigate="handleNavigation" />

    <!-- Product Details Modal -->
    <ProductDetails v-if="selectedProduct" :product="selectedProduct" @close="selectedProduct = null"
      @add-to-cart="addToCart" />
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'
import MenuItem from './MenuItem.vue'
import CartView from './CartView.vue'
import BottomNavigation from '../shared/BottomNavigation.vue'
import RecommendedSlider from './RecommendedSlider.vue'
import ProductDetails from './ProductDetails.vue'

const props = defineProps({
  menuItems: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['order-placed'])

const currentView = ref('home')
const categories = ['Sve', 'Kafa', 'Čaj', 'Sokovi']
const selectedCategory = ref('Sve')
const sortBy = ref('name')
const searchQuery = ref('')
const cart = ref([])
const selectedProduct = ref(null)

const cartItemCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const filteredAndSortedMenu = computed(() => {
  let result = props.menuItems

  if (selectedCategory.value !== 'Sve') {
    result = result.filter(item => item.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item => item.name.toLowerCase().includes(query))
  }

  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'price') {
    result.sort((a, b) => a.price - b.price)
  }

  return result
})

const handleNavigation = (route) => {
  currentView.value = route
}

const addToCart = (item) => {
  const existingItem = cart.value.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...item, quantity: 1 })
  }
}

const removeFromCart = (item) => {
  const index = cart.value.findIndex(i => i.id === item.id)
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity--
    } else {
      cart.value.splice(index, 1)
    }
  }
}

const handlePlaceOrder = () => {
  const order = {
    items: [...cart.value],
    tableId: 1,
    status: 'Nova'
  }
  emit('order-placed', order)
  cart.value = []
  currentView.value = 'home'
}

const getCategoryIcon = (category) => {
  const icons = {
    'Kafa': 'https://cdn-icons-png.flaticon.com/512/590/590749.png',
    'Čaj': 'https://cdn-icons-png.flaticon.com/512/590/590749.png',
    'Sokovi': 'https://cdn-icons-png.flaticon.com/512/590/590749.png',
    'Ostalo': 'https://cdn-icons-png.flaticon.com/512/590/590749.png'
  }
  return icons[category] || icons['Ostalo']
}

// Dodajemo computed property za preporučene proizvode
const recommendedItems = computed(() => {
  // Prikazujemo samo prve 3 proizvoda kao preporučene
  return props.menuItems.slice(0, 3).map(item => ({
    ...item,
    rating: 4.8,
    reviews: 2200,
    prepTime: '15 min'
  }))
})

const showProductDetails = (product) => {
  selectedProduct.value = product
}
</script>

<style scoped>
/* Dodajemo stilove za smooth scrolling i transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Custom shadow za fokusirani input */
.shadow-green-glow {
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.15);
}

/* Animacija za input */
input {
  transform-origin: center;
}

input:focus {
  transform: scale(1.01);
}
</style>