<script setup lang="ts">
import { ref, reactive } from "vue";
import { deleteTodolist } from "../../api/todolists";

const props = defineProps<{
  id: string | undefined;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", modelValue: boolean): void;
  (event: "success"): void;
}>();

const loading = ref(false);
const snackbar = reactive<{
  show: boolean;
  text: string;
}>({
  show: false,
  text: "",
});

const deleteItem = async () => {
  loading.value = true;

  try {
    await deleteTodolist(props.id as string);

    snackbar.text = "Successfully deleted item";
    snackbar.show = true;

    emit("update:modelValue", false);
    emit("success");

    loading.value = false;
  } catch {
    snackbar.text = "Error deleting item";
    snackbar.show = true;

    loading.value = false;
  }
};
</script>

<template>
  <VDialog v-bind="$attrs" width="auto" @update:model-value="emit('update:modelValue', $event)">
    <VCard v-if="id">
      <VCardTitle class="text-h5">
        Do you want to delete this item?
      </VCardTitle>
      <VCardText>This will delete the item permanently!</VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="primary" variant="text" @click="emit('update:modelValue', false)">
          Cancel
        </VBtn>
        <VBtn color="primary" :loading="loading" variant="text" @click="deleteItem">
          Delete
        </VBtn>
      </VCardActions>
    </VCard>

    <VCard v-else>
      <VCardTitle class="text-h5"> Select an item to delete </VCardTitle>
      <VBtn color="primary" variant="text" @click="emit('update:modelValue', false)">
        Close
      </VBtn>
    </VCard>
  </VDialog>

  <VSnackbar :timeout="2000" v-model="snackbar.show">
    {{ snackbar.text }}

    <template v-slot:actions>
      <VBtn color="primary" variant="text" @click="snackbar.show = false">
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
