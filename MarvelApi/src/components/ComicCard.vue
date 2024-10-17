<script setup lang="ts">
import type { Comic } from "@/types";
import CardView from "./CardView.vue";
defineProps<{
  comic: Comic;
}>();
</script>

<template>
  <CardView>
    <template #header>{{ comic.title }}</template>
    <img
      class="aspect-[150/228]"
      :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`"
    />
  </CardView>
</template>
