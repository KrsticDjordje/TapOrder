<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white">
      <div class="px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo and Title -->

          <div class="flex items-center mb-4 w-full">
            <div class="flex-shrink-0 mr-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMXr9BT4QnxAkvTz0eacWGaoMYdQQb37EYMQ&s"
                alt="Logo" class="h-12 w-15 rounded-lg">
            </div>
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">Hi {{ currentUser?.username }}</h1>
              <p class="text-gray-500">Enjoy in TapOrder 🔥</p>
            </div>
            <!-- <div class="relative">
              <button class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                <img src="https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg"
                  alt="Profile" class="w-8 h-8 rounded-full">
              </button>
            </div> -->
          </div>


          <!-- <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img src="https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg"
                alt="Logo" class="h-8 w-8 rounded-lg">
            </div>
            <h1 class="text-lg font-semibold text-gray-900">Kod Programera</h1>
          </div> -->

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
              class="absolute right-0 mt-2 w-48 rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-10">
              <div class="px-4 py-2 border-b">
                <p class="text-sm font-medium text-gray-900">{{ currentUser.username }}</p>
                <p class="text-xs text-gray-500">{{ getRoleName(currentUser.role) }}</p>
              </div>
              <!-- Switch Role -->
              <div class="px-4 py-2 border-b">
                <p class="text-xs text-gray-500 mb-2">Promeni ulogu</p>
                <div class="flex items-center space-x-2">
                  <button @click="switchRole('waiter')"
                    class="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200" :class="currentUser.role === 'waiter'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-50'">
                    Konobar
                  </button>
                  <button @click="switchRole('bartender')"
                    class="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200" :class="currentUser.role === 'bartender'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'">
                    Šanker
                  </button>
                </div>
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
    <main class="p-4 pb-20">
      <template v-if="isAdminRoute">
        <LoginForm v-if="!isLoggedIn" @login="handleAdminLogin" />

        <template v-else>
          <template v-if="currentUser.role === 'waiter' || currentUser.role === 'bartender'">
            <div v-show="activeTab === 'menu'">
              <MenuList :menu-items="menuItems" @order-placed="handleOrderPlaced" />
            </div>
            <div v-show="activeTab === 'tables' && currentUser.role === 'waiter'">
              <TableList :tables="tables" :orders="orders" @order-completed="handleOrderCompleted" />
            </div>
            <div v-show="activeTab === 'tables' && currentUser.role === 'bartender'">
              <OrderList :orders="orders" @order-completed="handleOrderCompleted" />
            </div>
          </template>
        </template>
      </template>

      <MenuList v-else :menu-items="menuItems" @order-placed="handleOrderPlaced" />
    </main>

    <!-- Bottom Navigation Bar za konobara -->
    <div v-if="isLoggedIn && (currentUser.role === 'waiter' || currentUser.role === 'bartender')"
      class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div class="flex justify-around items-center">
        <button @click="activeTab = 'menu'" class="flex flex-col items-center px-4 py-2 rounded-lg"
          :class="activeTab === 'menu' ? 'text-green-600' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span class="text-sm mt-1">Meni</span>
        </button>

        <button @click="activeTab = 'tables'" class="flex flex-col items-center px-4 py-2 rounded-lg"
          :class="activeTab === 'tables' ? 'text-green-600' : 'text-gray-600'">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              :d="currentUser.role === 'waiter'
                ? 'M4 6h16M4 10h16M4 14h16M4 18h16'
                : 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'" />
          </svg>
          <span class="text-sm mt-1">{{ currentUser.role === 'waiter' ? 'Stolovi' : 'Porudžbine' }}</span>
        </button>
      </div>
    </div>

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

// Dodajemo novi ref za aktivni tab
const activeTab = ref('menu')

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
  { id: 2, status: 'Slobodan' },
  { id: 3, status: 'Slobodan' },
  { id: 4, status: 'Slobodan' },
  { id: 5, status: 'Slobodan' },
  { id: 6, status: 'Slobodan' }
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

const switchRole = (newRole) => {
  if (currentUser.value) {
    currentUser.value = {
      ...currentUser.value,
      role: newRole
    }
    activeTab.value = 'menu' // Reset na meni tab pri promeni uloge
    isProfileMenuOpen.value = false
    showNotification(`Uloga promenjena na: ${getRoleName(newRole)}`)
  }
}

const handleOrderPlaced = (order) => {
  order.id = nextOrderId++
  order.status = 'Nova'
  order.createdAt = new Date().toISOString()
  order.type = 'drink'
  orders.value.push(order)
  const tableIndex = tables.value.findIndex(t => t.id === order.tableId)
  if (tableIndex !== -1) {
    tables.value[tableIndex].status = 'Zauzet'
  }
  showNotification('Narudžbina uspešno poslata!')
  console.log('Nova porudžbina:', order)
  console.log('Sve porudžbine:', orders.value)
}

const handleOrderCompleted = ({ orderId, newStatus }) => {
  const orderIndex = orders.value.findIndex(o => o.id === orderId)
  if (orderIndex !== -1) {
    orders.value[orderIndex].status = newStatus
    if (newStatus === 'Završena') {
      // Oslobađamo sto samo kad je porudžbina završena
      const tableIndex = tables.value.findIndex(t => t.id === orders.value[orderIndex].tableId)
      if (tableIndex !== -1) {
        tables.value[tableIndex].status = 'Slobodan'
      }
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