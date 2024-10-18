<script setup lang="ts">
import LoadingIndicator from "./LoadingIndicator.vue";
import { useComics } from "@/composables/useFetch";
import { useRoute } from "vue-router";
import type { Comic } from "@/types";
import { onMounted, ref, watch } from "vue";
import ComicCard from "./ComicCard.vue";
import PaginationComics from "./PaginationComics.vue";

const route = useRoute();
const comicsRef = ref<Comic[]>();
const isLoading = ref<boolean>(false);
const currentPage = ref<number | string>(0);
const totalPages = ref<number>(0);

// get the page variable from router and convert to a number +=
if (route.params.page) {
  currentPage.value = +route.params.page;
  console.log("Page number from URL:", currentPage.value);
}

const getComics = async () => {
  isLoading.value = true;

  const comics = await useComics(currentPage.value);
  currentPage.value = comics?.offset / comics?.limit || 0;
  totalPages.value = Math.ceil(comics.total / comics.limit);

  comicsRef.value = comics.results;
  isLoading.value = false;
};

watch(
  () => route.params.page,
  async (newPage, oldPage) => {
    console.log("OLD VALUE:", oldPage);
    console.log("NEW VALUE", newPage);

    console.log("TYPE OF OLD VALUE", typeof newPage);
    if (!newPage) {
      console.log("YEP!");
      currentPage.value = 0;
    } else if (newPage) {
      currentPage.value = Number(newPage);
    }
    console.log("We are at page :", currentPage.value);
    console.log("Type of this :", typeof currentPage.value);
    // const pageNumber = Number(newPage);
    // currentPage.value = pageNumber; // Update `currentPage` ref
    await getComics();
  },
  { immediate: true }
);

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
        <PaginationComics
          :total-pages="totalPages"
          :current-page="+currentPage"
          path="/"
        >
        </PaginationComics>
      </div>
    </div>
  </div>
</template>
