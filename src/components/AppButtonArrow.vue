<template>
  <span class="btn-arrow" :class="`arrow-${direction}`" aria-hidden="true">
    <!-- Idle Arrow SVG -->
    <svg
      class="arrow-svg arrow-idle"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Left Idle: curve-arrow-left-sqaure (curves down & left) -->
      <template v-if="direction === 'left'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" transform="translate(24 24) rotate(180)" fill="#FEF3C7" />
        <polyline class="arrow-line" points="9.12 11.2 7 14.88 10.67 17" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M7,14.88s7,0,10-7.88" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" transform="translate(24 24) rotate(180)" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>

      <!-- Right / External Idle: curve-arrow-right-square (curves up & right) -->
      <template v-else-if="direction === 'external' || direction === 'right'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" />
        <polyline class="arrow-line" points="14.88 12.8 17 9.12 13.33 7" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M17,9.12S10,9.12,7,17" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>

      <!-- Up Idle: curve-arrow-up-square (curves up & left) -->
      <template v-else-if="direction === 'up'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" transform="translate(0 24) rotate(-90)" fill="#FEF3C7" />
        <polyline class="arrow-line" points="12.8 9.12 9.12 7 7 10.67" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M9.12,7s0,7,7.88,10" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" transform="translate(0 24) rotate(-90)" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>

      <!-- Down Idle: curve-arrow-down-square (curves down & right) -->
      <template v-else-if="direction === 'down'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" transform="translate(24) rotate(90)" fill="#FEF3C7" />
        <polyline class="arrow-line" points="11.2 14.88 14.88 17 17 13.33" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M14.88,17s0-7-7.88-10" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" transform="translate(24) rotate(90)" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>
    </svg>

    <!-- Hover Morph Arrow SVG -->
    <svg
      class="arrow-svg arrow-hover"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Left Hover: curve-arrow-left-sqaure-2 (curves up & left) -->
      <template v-if="direction === 'left'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" transform="translate(24 24) rotate(180)" fill="#FEF3C7" />
        <polyline class="arrow-line" points="10.67 7 7 9.12 9.12 12.8" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M17,17C14,9.12,7,9.12,7,9.12" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" transform="translate(24 24) rotate(180)" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>

      <!-- Right / External Hover: curve-arrow-right-square-2 (curves down & right) -->
      <template v-else-if="direction === 'external' || direction === 'right'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" fill="#FEF3C7" />
        <polyline class="arrow-line" points="13.33 17 17 14.88 14.88 11.2" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M7,7c3,7.88,10,7.88,10,7.88" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>

      <!-- Up Hover: curve-arrow-up-square-2 (curves up & right) -->
      <template v-else-if="direction === 'up'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" transform="translate(0 24) rotate(-90)" fill="#FEF3C7" />
        <polyline class="arrow-line" points="17 10.67 14.88 7 11.2 9.12" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M7,17c7.88-3,7.88-10,7.88-10" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" transform="translate(0 24) rotate(-90)" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>

      <!-- Down Hover: curve-arrow-down-square-2 (curves down & left) -->
      <template v-else-if="direction === 'down'">
        <rect class="arrow-bg" x="3" y="3" width="18" height="18" rx="2" transform="translate(24) rotate(90)" fill="#FEF3C7" />
        <polyline class="arrow-line" points="7 13.33 9.12 17 12.8 14.88" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path class="arrow-line" d="M17,7C9.12,10,9.12,17,9.12,17" fill="none" stroke="#0E0F12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <rect class="arrow-stroke" x="3" y="3" width="18" height="18" rx="2" transform="translate(24) rotate(90)" fill="none" stroke="#0E0F12" stroke-width="2" />
      </template>
    </svg>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    direction?: 'left' | 'right' | 'external' | 'up' | 'down'
  }>(),
  {
    direction: 'left',
  }
)
</script>
