<script setup lang="ts">
import { ref, reactive } from "vue";

const props = defineProps<{
  id: number | undefined;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: boolean): void;
}>();

const loading = ref(false);
const snackbar = reactive<{
  show: boolean;
  text: string;
}>({
  show: false,
  text: "",
});

const deleteItem = () => {
  loading.value = true;

  setTimeout(() => {
    if (Math.random() > 0.5) {
      snackbar.text = "Successfully deleted item";
      snackbar.show = true;

      console.log("Deleted item" + props.id);
      emit("update:modelValue", false);

      loading.value = false;
    } else {
      snackbar.text = "Error deleting item";
      snackbar.show = true;

      loading.value = false;
    }
  }, 1000);
};
</script>

<template>
  <VDialog
    v-bind="$attrs"
    width="auto"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <VCard v-if="id">
      <VCardTitle class="text-h5">
        Do you want to delete this item?
      </VCardTitle>
      <VCardText>This will delete the item permanently!</VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn
          color="green-darken-1"
          variant="text"
          @click="emit('update:modelValue', false)"
        >
          Cancel
        </VBtn>
        <VBtn
          color="green-darken-1"
          :loading="loading"
          variant="text"
          @click="deleteItem"
        >
          Delete
        </VBtn>
      </VCardActions>
    </VCard>

    <VCard v-else>
      <VCardTitle class="text-h5"> Select an item to delete </VCardTitle>
      <VBtn
        color="green-darken-1"
        variant="text"
        @click="emit('update:modelValue', false)"
      >
        Close
      </VBtn>
    </VCard>
  </VDialog>

  <VSnackbar :timeout="2000" v-model="snackbar.show">
    {{ snackbar.text }}

    <template v-slot:actions>
      <VBtn color="pink" variant="text" @click="snackbar.show = false">
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
