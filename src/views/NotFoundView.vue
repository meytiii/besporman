<template>
  <main id="main-content" class="not-found-page">
    <Error404Page />
  </main>
</template>

<script setup lang="ts">
import Error404Page from '@/components/ui/Error404Page.vue'
</script>

<style scoped>
.not-found-page {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
