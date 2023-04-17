<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false)
</script>

<template>
  <VLayout>
    <vAppBar color="primary" prominent>
      <vAppBarNavIcon variant="text" @click.stop="drawer = !drawer"></vAppBarNavIcon>

      <VToolbarTitle>Todolist</VToolbarTitle>

      <VSpacer></VSpacer>

      <VBtn variant="text" icon="mdi-magnify"></VBtn>

      <VBtn variant="text" icon="mdi-filter"></VBtn>

      <VBtn variant="text" icon="mdi-dots-vertical"></VBtn>
    </vAppBar>

    <VNavigationDrawer v-model="drawer" temporary>
      <VList>
        <VListItem prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"></VListItem>
      </VList>
      <VDivider></VDivider>

      <VList density="compact" nav>
        <VListItem prepend-icon="mdi-view-list" title="Todolists" value="myfiles" />
      </VList>
    </VNavigationDrawer>

    <VMain>
      <slot />
    </VMain>
  </VLayout>
</template>