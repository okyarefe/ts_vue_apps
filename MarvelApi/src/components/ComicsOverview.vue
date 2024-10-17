<script setup lang="ts">
import LoadingIndicator from "./LoadingIndicator.vue";
import { useComics } from "@/composables/useFetch";
import type { Comic } from "@/types";
import { onMounted, ref } from "vue";
import ComicCard from "./ComicCard.vue";

const comicsRef = ref<Comic[]>();
const isLoading = ref<boolean>(false);

const getComics = async () => {
  isLoading.value = true;
  const comics = await useComics();
  console.log("Comics Returned from backend", comics);
  comicsRef.value = comics.results;
  isLoading.value = false;
};

onMounted(async () => {
  await getComics();
});
</script>

<template>
  <div>
    <LoadingIndicator
      v-if="isLoading"
      text="Loading comics..."
    ></LoadingIndicator>
    <div v-if="comicsRef && !isLoading">
      <div
        class="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <ComicCard
          :key="comic.id"
          v-for="comic in comicsRef"
          :comic="comic"
        ></ComicCard>
      </div>
    </div>
  </div>
</template>
