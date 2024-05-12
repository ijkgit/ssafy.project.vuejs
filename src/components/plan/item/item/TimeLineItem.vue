<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  plan: Object,
});

const image = computed(() => {
  if (!props.plan.image)
    return "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png";
  else return props.plan.image;
});

const direction = computed(() => {
  if (props.plan.planPathIdx % 2 == 0) return "left-2";
  else return "right-2";
});
</script>

<template>
  <div :class="['timeline-2', direction]">
    <div class="card">
      <img :src="image" class="card-img-top" alt="Responsive image" />
      <div class="card-body p-4">
        <h4 class="fw-bold mb-4">{{ plan.placeName }}</h4>
        <p class="text-muted mb-4">
          <i class="far fa-clock" aria-hidden="true"></i> 여행 > 관광,명소 >
          테마거리
        </p>
        <p class="mb-0">{{ plan.addressName }}</p>
        <p class="mb-0">{{ plan.phone }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/plan/map.css";
</style>
