<script setup>
import PlanViewBoardItem from "@/components/plan/item/PlanViewBoardItem.vue";
import { ref, onMounted, onBeforeMount, } from "vue";
import { useRoute } from "vue-router";
import { Axios } from "@/util/http-commons.js";

const route = useRoute();
const articleNo = route.params.articleNo;
const http = Axios("plan");
const plan = ref([{}]);


console.log(plan.value)
onBeforeMount(async () => {
  console.log("onBeforeMount 호출");
  
  await getView();
  console.log("onBeforeMount 끝");
});

onMounted(() => {
  console.log(articleNo);
});

const getView = async () => {
  await http.get(`view/${articleNo}`).then((response) => {
    plan.value = response.data;
    console.log(plan.value[0]);
    console.log(plan.value);
  });
};
// const PlanViewBoardItem = defineAsyncComponent(() =>
//   import("@/components/plan/item/PlanViewBoardItem.vue")
// );
</script>

<template>
  <PlanViewBoardItem :plan="plan[0]"/>
</template>

<style scoped></style>