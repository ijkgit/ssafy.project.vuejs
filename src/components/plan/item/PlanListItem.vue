<script setup>
defineProps({
  plan: Object,
});
</script>

<template>
  <div class="col">
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
</template>

<style scoped></style>
