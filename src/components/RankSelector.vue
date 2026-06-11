<template>
  <div class="mb-2">
    {{ $t('messages.rank').toUpperCase() }}
  </div>
  <v-divider class="mb-4"></v-divider>

  <!-- Mount point for the standalone rank-tree.js script (hexagonal rank tree) -->
  <div class="rank-tree-mount"></div>
</template>

<script setup lang="ts">
// The interactive rank tree is rendered by public/rank-tree.js, which hooks into
// the .rank-tree-mount element above using window.__charStore / window.__getRanks.
</script>

<style scoped>
</style>
