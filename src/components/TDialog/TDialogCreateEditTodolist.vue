<script setup lang="ts">
import { watch, useAttrs, reactive, ref } from 'vue';
import { getTodolist, createTodolist, updateTodolist } from '../../api/todolists';

const props = defineProps<{ id: string | null }>();
const emit = defineEmits<{
  (event: "update:modelValue", modelValue: boolean): void;
  (event: "success"): void,
}>();

const attrs = useAttrs();
const loading = ref(false);

const state = reactive({
  title: '',
  description: '',
});

const snackbar = reactive<{
  show: boolean;
  text: string;
}>({
  show: false,
  text: "",
});

watch(() => attrs?.modelValue, async (value) => {
  if (value && props.id) {
    try {
      loading.value = true;
      const res = await getTodolist(props.id)

      state.title = res.document.title;
      state.description = res.document.description;

      loading.value = false;
    } catch {
      loading.value = false;

      snackbar.text = "Error while loading todolist";
      snackbar.show = true;

      emit('update:modelValue', false)
    }
  } else {
    state.title = '';
    state.description = '';
  }
});

const submitTodolist = async () => {
  try {
    loading.value = true;

    if (props.id) {
      await updateTodolist(props.id, {
        title: state.title,
        description: state.description
      });

      loading.value = false;

      snackbar.text = "Todolist updated";
      snackbar.show = true;
    } else {
      await createTodolist({
        title: state.title,
        description: state.description
      });

      loading.value = false;

      snackbar.text = "Todolist created";
      snackbar.show = true;
    }

    emit('success');
    emit('update:modelValue', false)
  } catch {
    loading.value = false;

    snackbar.text = "Error while handling todolist";
    snackbar.show = true;
  }
};
</script>

<template>
  <VDialog v-bind="attrs" max-width="500px" @update:model-value="emit('update:modelValue', $event)">
    <VCard>
      <VCardTitle class="text-h5">
        {{ props.id ? 'Edit' : 'Create' }} todolist
      </VCardTitle>
      <VCardText v-if="!loading">
        <VForm>
          <VTextField v-model="state.title" label="Title" />
          <VTextarea v-model="state.description" label="Description" />
        </VForm>
      </VCardText>
      <VCardText v-else>
        <VProgressLinear indeterminate></VProgressLinear>
      </VCardText>
      <VCardActions>
        <VSpacer></VSpacer>
        <VBtn color="primary" @click="emit('update:modelValue', false)">
          Close
        </VBtn>
        <VBtn color="primary" @click="submitTodolist">
          {{ props.id ? 'Edit' : 'Create' }}
        </VBtn>
      </VCardActions>
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