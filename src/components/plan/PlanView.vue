<script setup>
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
      <div class="col" v-for="plan in plans" :key="plan.articleNo">
        <div class="card">
          <img src="@/assets/img/plan/tmp.png" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ plan.subject }}</h5>
            <p class="card-text">{{ plan.content }}</p>
          </div>
          <div class="d-grid justify-content-md-end mb-3 me-3 mt-2">
            <a
              id="secondary-outline-button"
              href="/plan.do/view/${ board.articleNo }"
              class="btn btn-outline-primary justify-content-md-end"
              >자세히 보기</a
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
