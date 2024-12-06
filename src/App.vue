<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo and Title -->
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img src="/logo.png" alt="Logo" class="h-8 w-8 rounded-lg">
            </div>
            <h1 class="text-lg font-semibold text-gray-900">Kod Programera</h1>
          </div>

          <!-- Profile Menu - samo za admin korisnike -->
          <div v-if="isAdminUser" class="relative">
            <button @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="flex items-center space-x-2 rounded-full bg-white p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div class="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white">
                {{ currentUser.username.charAt(0).toUpperCase() }}
              </div>
              <svg class="h-5 w-5 text-gray-400" :class="{ 'rotate-180': isProfileMenuOpen }" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile Dropdown -->
            <div v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="px-4 py-2 border-b">
                <p class="text-sm font-medium text-gray-900">{{ currentUser.username }}</p>
                <p class="text-xs text-gray-500">{{ getRoleName(currentUser.role) }}</p>
              </div>
              <button @click="logout" class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <svg class="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Odjava
              </button>
            </div>
          </div>
        </div>

        <!-- Role Badge - samo za admin korisnike -->
        <div v-if="isAdminUser" class="mt-2">
          <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="{
            'bg-green-100 text-green-700': currentUser.role === 'waiter',
            'bg-purple-100 text-purple-700': currentUser.role === 'bartender'
          }">
            {{ getRoleName(currentUser.role) }}
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-4">
      <template v-if="isAdminRoute">
        <LoginForm v-if="!isLoggedIn" @login="handleAdminLogin" />

        <template v-else>
          <TableList v-if="currentUser.role === 'waiter'" :tables="tables" :orders="orders"
            @order-completed="handleOrderCompleted" />

          <OrderList v-else-if="currentUser.role === 'bartender'" :orders="orders"
            @order-completed="handleOrderCompleted" />
        </template>
      </template>

      <MenuList v-else :menu-items="menuItems" @order-placed="handleOrderPlaced" />
    </main>

    <NotificationMessage :show="notificationVisible" :message="notificationMessage" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import LoginForm from './components/auth/LoginForm.vue'
import MenuList from './components/menu/MenuList.vue'
import TableList from './components/waiter/TableList.vue'
import OrderList from './components/bartender/OrderList.vue'
import NotificationMessage from './components/shared/NotificationMessage.vue'

// Auth state
const isLoggedIn = ref(false)
const currentUser = ref(null)
const notificationVisible = ref(false)
const notificationMessage = ref('')
const isProfileMenuOpen = ref(false)
const isAdminRoute = ref(false)

// Computed properties
const isAdminUser = computed(() => {
  return isLoggedIn.value && ['waiter', 'bartender'].includes(currentUser.value?.role)
})

// Check route on mount
onMounted(() => {
  isAdminRoute.value = window.location.pathname.includes('/admin')

  // Ako nije admin ruta, automatski postavi guest ulogu
  if (!isAdminRoute.value) {
    handleGuestLogin()
  }
})

// Helper function for role names
const getRoleName = (role) => {
  const roleNames = {
    guest: 'Gost',
    waiter: 'Konobar',
    bartender: 'Šanker'
  }
  return roleNames[role] || role
}

// Data
const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    price: 150,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Kafa',
    description: 'Rich and creamy espresso made from freshly ground premium coffee beans.',
    ingredients: ['Coffee beans', 'Water'],
    preparationTime: '5 min',
    rating: 4.8,
    reviews: 2200
  },
  {
    id: 2,
    name: 'Cappuccino',
    price: 200,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Kafa'
  },
  {
    id: 3,
    name: 'Latte',
    price: 220,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Kafa'
  },
  {
    id: 4,
    name: 'Zeleni Čaj',
    price: 180,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Čaj'
  },
  {
    id: 5,
    name: 'Crni Čaj',
    price: 180,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Čaj'
  },
  {
    id: 6,
    name: 'Coca Cola',
    price: 200,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Sokovi'
  },
  {
    id: 7,
    name: 'Fanta',
    price: 200,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Sokovi'
  },
  {
    id: 8,
    name: 'Sprite',
    price: 200,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Sokovi'
  },
  {
    id: 9,
    name: 'Limunada',
    price: 220,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Sokovi'
  },
  {
    id: 10,
    name: 'Ceđena Pomorandža',
    price: 250,
    image: 'https://www.fantescoffee.com/cdn/shop/products/espresso.jpg?v=1627317135',
    category: 'Sokovi'
  }
]

const tables = ref([
  { id: 1, status: 'Slobodan' },
  { id: 2, status: 'Zauzet' },
  // ... ostali stolovi
])

const orders = ref([])
let nextOrderId = 1

// Event handlers
const handleGuestLogin = () => {
  isLoggedIn.value = true
  currentUser.value = { username: 'guest', role: 'guest' }
}

const handleAdminLogin = (userData) => {
  if (['waiter', 'bartender'].includes(userData.role)) {
    isLoggedIn.value = true
    currentUser.value = userData
    isProfileMenuOpen.value = false
  } else {
    showNotification('Nemate pristup admin panelu')
  }
}

const logout = () => {
  isLoggedIn.value = false
  currentUser.value = null
  isProfileMenuOpen.value = false

  // Redirect to home if logged out from admin
  if (isAdminRoute.value) {
    window.location.href = '/'
  }
}

const handleOrderPlaced = (order) => {
  order.id = nextOrderId++
  orders.value.push(order)
  const tableIndex = tables.value.findIndex(t => t.id === order.tableId)
  if (tableIndex !== -1) {
    tables.value[tableIndex].status = 'Zauzet'
  }
  showNotification('Narudžbina uspešno poslata!')
}

const handleOrderCompleted = (orderId) => {
  const orderIndex = orders.value.findIndex(o => o.id === orderId)
  if (orderIndex !== -1) {
    orders.value[orderIndex].status = 'Završena'
    const tableIndex = tables.value.findIndex(t => t.id === orders.value[orderIndex].tableId)
    if (tableIndex !== -1) {
      tables.value[tableIndex].status = 'Slobodan'
    }
  }
}

const showNotification = (message) => {
  notificationMessage.value = message
  notificationVisible.value = true
  setTimeout(() => {
    notificationVisible.value = false
  }, 3000)
}
</script>

<style>
/* Zadržite samo custom stilove */
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.2s ease-in-out;
}
</style>