<script setup lang="ts">
import { ref, nextTick } from "vue";
import TCard from "./components/TCard/TCard.vue";
import TDialogDelete from "./components/TDialog/TDialogDelete.vue";

const items = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
  },
  {
    id: 3,
    title: "Title 3",
    description: "Description 3",
  },
  {
    id: 4,
    title: "Title 3",
    description: "Description 3",
  },
  {
    id: 5,
    title: "Title 3",
    description: "Description 3",
  },
  {
    id: 6,
    title: "Title 3",
    description: "Description 3",
  },
  {
    id: 7,
    title: "Title 3",
    description: "Description 3",
  },
];

const itemIdSelect = ref<number | undefined>(0);
const editCreateModalState = ref(false);
const deleteModalState = ref(false);

type actionsTypes = "delete" | "create" | "edit";
const runAction = async (action: actionsTypes, id?: number) => {
  itemIdSelect.value = id;

  const options: Record<actionsTypes, Function> = {
    delete: () => (deleteModalState.value = true),
    create: () => (editCreateModalState.value = true),
    edit: () => (editCreateModalState.value = true),
  };

  options[action] ? options[action]() : null;
};
</script>

<template>
  <VApp>
    <VMain>
      <VContainer class="py-8 px-6" fluid>
        <VRow>
          <VCol
            v-for="{ title, description, id } in items"
            cols="12"
            md="6"
            lg="3"
          >
            <TCard
              :title="title"
              :subtitle="description"
              :id="id"
              @delete="runAction('delete', $event)"
              @edit="runAction('edit', $event)"
            />
          </VCol>
        </VRow>
      </VContainer>
    </VMain>

    <TDialogDelete :id="itemIdSelect" v-model="deleteModalState" />
  </VApp>
</template>
