<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  speed: number;
}>();

const limit = 20;

const windStyle = computed(() => {
  if (props.speed > limit) {
    return { backgroundColor: "#FF6347", color: "white" };
  } else {
    return { backgroundColor: "white" };
  }
});
const windDescription = computed(() => {
  return props.speed > limit ? "Strong wind!" : "Moderate wind";
});
</script>

<template>
  <div>
    <p
      data-testid="winddescription-computedstyles"
      aria-hidden="true"
      class="rounded-lg shadow-lg text-md inline p-0.5 font-medium"
      :style="windStyle"
    >
      {{ windDescription }}
    </p>
    <p class="sr-only">Wind speed {{ speed }} kmh</p>
  </div>
</template>
