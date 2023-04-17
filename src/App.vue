<script setup lang="ts">
import TLayout from "./components/TLayout/TLayout.vue";
import TodoLists from "./pages/TodoLists.vue";
</script>

<template>
  <VApp>
    <TLayout>
      <TodoLists />
    </TLayout>
  </VApp>
</template>