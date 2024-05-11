<script setup>
import PlanListItem from "@/components/plan/item/PlanListItem.vue";
import { ref, onMounted } from "vue";
import { Axios } from "@/util/http-commons.js";

const http = Axios("plan");
const plans = ref([]);

onMounted(() => {
  getPlanList();
});

const getPlanList = async () => {
  await http.get("list").then((response) => {
    plans.value = response.data;
  });
};
</script>

<template>
  <div class="container">
    <div
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 text-center mt-5"
    >
      <h1 class="display-5 fw-bold text-body-emphasis col-md-12">
        나의 여행 계획
      </h1>
      <div class="col-md-12 text-end">
        <button type="button" class="btn btn-primary" onclick="goWrite();">
          작성하기
        </button>
      </div>
    </div>
  </div>
  <!-- 타이틀 -->

  <main class="container-md mt-2 mb-5">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <PlanListItem v-for="plan in plans" :key="plan.articleNo" :plan="plan" />
    </div>
  </main>
</template>

<style scoped></style>
