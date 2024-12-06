<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-2xl font-semibold text-gray-900 mb-6">Admin Login</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        >
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-4 py-3 rounded-xl border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          required
        >
      </div>
      <button 
        type="submit" 
        class="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <span>Login</span>
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['login'])
const username = ref('')
const password = ref('')

const handleSubmit = () => {
  if (username.value === 'waiter' || username.value === 'bartender') {
    emit('login', { username: username.value, role: username.value })
    username.value = ''
    password.value = ''
  } else {
    alert('Invalid username or password')
  }
}
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

input {
  @apply shadow-sm;
}

input:focus {
  @apply outline-none;
}
</style> 