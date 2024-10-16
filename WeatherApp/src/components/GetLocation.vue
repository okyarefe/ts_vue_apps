<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { GeoLocation } from "@/types";

import WeatherReport from "./WeatherReport.vue";

onMounted(() => getGeolocation());

const coords = ref<GeoLocation | null>(null);
const geolocationBlockedByUser = ref<boolean>(false);

const getGeolocation = async () => {
  console.log("getGeolocation ran");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      coords.value = position.coords;
    },
    (error) => {
      console.log("Ups, user did not accept to share their location");
      geolocationBlockedByUser.value = true;
      console.log("Error!:", error);
    }
  );
};
</script>

<template>
  <div v-if="!geolocationBlockedByUser && coords">
    <WeatherReport :coords="coords"></WeatherReport>
  </div>
  <div v-else>User did not allow to track their location</div>
</template>
