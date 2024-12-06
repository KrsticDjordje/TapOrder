<template>
  <div class="mb-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">Recommended</h2>
      <button class="text-sm text-emerald-600 font-medium">View All</button>
    </div>
    <Swiper
      :modules="[Autoplay, Pagination]"
      :slides-per-view="1.2"
      :space-between="16"
      :pagination="{
        clickable: true,
        dynamicBullets: true
      }"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }"
      class="recommended-swiper"
    >
      <SwiperSlide 
        v-for="item in items" 
        :key="item.id"
      >
        <div class="relative rounded-2xl overflow-hidden">
          <img 
            :src="item.image" 
            :alt="item.name"
            class="w-full h-48 object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div class="flex items-center space-x-2 mb-1">
              <span class="text-xs bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">{{ item.category }}</span>
              <div class="flex items-center text-xs">
                <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.8 (2.2k review)
              </div>
            </div>
            <h3 class="font-semibold text-lg mb-1">{{ item.name }}</h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">15 min</span>
              </div>
              <button 
                @click="$emit('add-to-cart', item)"
                class="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm hover:bg-emerald-600 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>

<style scoped>
.recommended-swiper {
  padding-bottom: 2rem !important;
}

:deep(.swiper-pagination) {
  bottom: 0 !important;
}

:deep(.swiper-pagination-bullet) {
  @apply bg-emerald-600 opacity-50;
}

:deep(.swiper-pagination-bullet-active) {
  @apply opacity-100;
}
</style> 