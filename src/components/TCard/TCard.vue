<script setup lang="ts">
defineProps<{ id: string | undefined }>();

const emit = defineEmits<{
  (event: "edit", id: string | undefined): void;
  (event: "delete", id: string | undefined): void;
}>();
</script>

<template>
  <VCard>
    <VCardActions>
      <VSpacer />

      <VBtn size="small" color="surface-variant" variant="text" icon="mdi-pencil" @click="emit('edit', id)" />

      <VBtn size="small" color="surface-variant" variant="text" icon="mdi-trash-can-outline"
        @click="emit('delete', id)" />
    </VCardActions>
  </VCard>
</template>
