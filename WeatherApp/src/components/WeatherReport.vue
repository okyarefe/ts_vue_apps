<script setup lang="ts">
import type { WeatherData, GeoLocation } from "@/types";
import WindDirection from "./WindDirection.vue";
import { onMounted, ref } from "vue";

const FETCH_WEATHER_DATA_URL = "http://localhost:5000/weatherapi";

const data = ref<WeatherData | null>(null);
const error = ref<null | number | string>(null);
const props = defineProps<{
  coords: GeoLocation;
}>();
onMounted(async () => {
  const weatherResponse = await fetchWeather(props.coords);
  data.value = weatherResponse;
});

const fetchWeather = async (
  coords: GeoLocation
): Promise<WeatherData | null> => {
  const { latitude, longitude } = coords;

  try {
    const response = await fetch(
      `${FETCH_WEATHER_DATA_URL}?latitude=${latitude}&longitude=${longitude}`
    );
    const data = await response.json();
    if (!response.ok) {
      error.value = data.error;
      throw new Error("Network Error");
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
};
</script>

<template>
  <div>
    <h5 class="text-center text-4xl text-white">WEATHER REPORT!</h5>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <article
        class="bg-yellow-400 max-w-md w-96 rounded-lg shadow-xl p-4 flex bg-white-900 text-black"
        v-if="data"
      >
        <div class="basis-1/4 text-left">
          <img :src="data.current.condition.icon" class="w-16 h-16" />
        </div>
        <div class="basis-3/4">
          <h1 class="text-3xl font-bold">
            {{ data.current.condition.text }}
            <span class="text-2xl block">{{ data.current.temp_c }}&#8451;</span>
            <p>{{ data.location.name }}</p>
            <p>{{ data.current.precip_mm }}mm</p>
          </h1>
          <div class="flex gap-4">
            <WindDirection :speed="data.current.wind_kph"></WindDirection>
            <p>{{ data.current.wind_kph }}kmh</p>
          </div>
        </div>
      </article>
      <div v-else>...Loading...</div>
    </div>
  </div>
</template>
