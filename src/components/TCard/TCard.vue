<script setup lang="ts">
defineProps<{ id: number }>();

const emit = defineEmits<{
  (event: "edit", id: number): void;
  (event: "delete", id: number): void;
}>();
</script>

<template>
  <VCard>
    <VCardActions>
      <VSpacer />

      <VBtn
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-pencil"
        @click="emit('edit', id)"
      />

      <VBtn
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-trash-can-outline"
        @click="emit('delete', id)"
      />
    </VCardActions>
  </VCard>
</template>
