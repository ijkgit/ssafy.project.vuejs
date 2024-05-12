<script setup>
import TimeLineItem from "@/components/plan/item/item/TimeLineItem.vue";
const props = defineProps({
  plan: Array,
});
</script>

<template>
  <section class="pb-4">
    <div class="border rounded-5">
      <section
        class="p-4 w-100"
        style="background-color: #f0f2f5; border-radius: 0.5rem 0.5rem 0 0"
      >
        <div class="w-75 my-0 mx-auto re">
          <TimeLineItem :plan="p" v-for="p in plan" :key="p.planPathIdx" />
          <div class="main-timeline-2" />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.re {
  position: relative;
}
.main-timeline-2 {
  content: "";
  position: absolute;
  width: 3px;
  background-color: #26c6da;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}
</style>
