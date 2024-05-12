<script setup>
const props = defineProps({
  plan: Object,
});
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <div class="row my-2">
          <h2 class="text-secondary px-5" id="subject">
            {{ plan.subject }}
          </h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <p>
                <span class="fw-bold" id="userId">{{ plan.userId }}</span>
                <br />
                <span class="text-secondary fw-light">
                  <span id="registerTime">{{ plan.registerTime }}</span> 조회 :
                  <span id="hit">{{ plan.hit }}</span>
                </span>
              </p>
            </div>
            <div class="divider mb-3"></div>
            <div class="text-secondary">
              <span id="content">{{ plan.content }}</span>
            </div>
            <div class="divider mt-3 mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
