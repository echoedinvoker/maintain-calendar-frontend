<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <Header />
  <main class="is-light-mode mx-8">
    <RouterView />
  </main>
  <Footer />
  <Toaster />
</template>

