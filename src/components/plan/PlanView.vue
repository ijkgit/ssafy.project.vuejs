<script setup>
import PlanViewBoardItem from "@/components/plan/item/PlanViewBoardItem.vue";
import PlanViewMapItem from "@/components/plan/item/PlanViewMapItem.vue";
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Axios } from "@/util/http-commons.js";

const route = useRoute();
const articleNo = route.params.articleNo;
const http = Axios("plan");
const plan = ref([{}, [{}]]);

onMounted(() => {
  getView();
});

const getView = async () => {
  await http.get(`view/${articleNo}`).then((response) => {
    plan.value = response.data;
  });
};
</script>

<template>
  <PlanViewBoardItem :plan="plan[0]" />
  <PlanViewMapItem :plan="plan[1]" />
</template>

<style scoped></style>