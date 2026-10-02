<template>
  <svg
    class="card-icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="butt"
    stroke-linejoin="miter"
    stroke-miterlimit="10"
    aria-hidden="true"
  >
    <template v-if="name === 'download'">
      <path d="M12 3v12" />
      <path d="M6.5 10.5L12 16l5.5-5.5" />
      <path d="M4 15.5V20h16v-4.5" />
    </template>
    <template v-else-if="name === 'report'">
      <path d="M6 3v18" />
      <path d="M6 4.5h12.5L15 9l3.5 4.5H6" />
    </template>
    <template v-else-if="name === 'edit'">
      <path d="M4 20l1.3-5L16.5 3.8l3.7 3.7L9 18.7z" />
      <path d="M13.8 6.5l3.7 3.7" />
    </template>
    <template v-else-if="name === 'delete'">
      <path d="M4.5 6.5h15" />
      <path d="M9 6.5V3.5h6v3" />
      <path d="M6.5 6.5l1 14h9l1-14" />
      <path d="M10.3 10v7M13.7 10v7" />
    </template>
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: 'download' | 'report' | 'edit' | 'delete' }>()
</script>
