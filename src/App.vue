<script setup lang="ts">
import { ref } from "vue";
import TCard from "./components/TCard/TCard.vue";
import TDialogDeleteTodolist from "./components/TDialog/TDialogDeleteTodolist.vue";
import TDialogCreateEditTodolist from "./components/TDialog/TDialogCreateEditTodolist.vue";
import { getTodolists } from "./api/todolists";
import { useQuery } from '@tanstack/vue-query'

const { data, isLoading, refetch } = useQuery({
  queryKey: ['todolists'],
  queryFn: getTodolists,
})

const itemIdSelect = ref<string | undefined>(undefined);
const editCreateModalState = ref(false);
const deleteModalState = ref(false);

type actionsTypes = "delete" | "create" | "edit";
const runAction = async (action: actionsTypes, id?: string) => {
  if (id) itemIdSelect.value = id;

  const options: Record<actionsTypes, Function> = {
    delete: () => (deleteModalState.value = true),
    edit: () => (editCreateModalState.value = true),
    create: () => {
      itemIdSelect.value = undefined
      editCreateModalState.value = true
    },
  };

  options[action] ? options[action]() : null;
};
</script>

<template>
  <VApp>
    <VMain>
      <VBtn @click="runAction('create')" color="primary" class="fixed bottom-4 right-4">Create</VBtn>
      <VContainer class="py-8 px-6" fluid>
        <VRow v-if="!isLoading">
          <VCol v-for="{ title, description, id } in data?.documents" cols="12" md="6" lg="3">
            <TCard :title="title" :subtitle="description" :id="id" @delete="runAction('delete', $event)"
              @edit="runAction('edit', $event)" />
          </VCol>
        </VRow>
        <VRow v-else>
          <VCol cols="12">
            <VProgressLinear indeterminate color="green" />
          </VCol>
        </VRow>
      </VContainer>
    </VMain>

    <TDialogDeleteTodolist :id="itemIdSelect" v-model="deleteModalState" @success="refetch" />
    <TDialogCreateEditTodolist :id="itemIdSelect" v-model="editCreateModalState" @success="refetch" />
  </VApp>
</template>
