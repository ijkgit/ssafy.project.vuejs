<script setup>
import { watch, ref } from "vue";
const props = defineProps({
  areas: Object,
});

const isShow = ref(false);

const areasWatch = watch(
  () => props.areas.value,
  () => {
    console.log(props.areas.value);
    console.log(props.areas[0].firstImage);
    if (props.areas) isShow.value = true;
  },
  {
    deep: true,
  }
);

const emit = defineEmits(["click"]);
const clickArea = (la, ma) => {
  emit("click", la, ma);
};
</script>

<template>
  <div class="row">
    <table class="table table-striped" v-show="isShow">
      <thead>
        <tr>
          <th>대표이미지</th>
          <th>관광지명</th>
          <th>주소</th>
          <th>위도</th>
          <th>경도</th>
        </tr>
      </thead>
      <tbody id="trip-list">
        <tr
          v-for="area in props.areas"
          :key="area.contentId"
          @click="clickArea(area.latitude, area.longitude)"
        >
          <td v-if="area.firstImage"><img :src="area.firstImage" width="100px" /></td>
          <td v-else>
            <img
              src="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
              width="100px"
            />
          </td>
          <td>{{ area.title }}</td>
          <td>{{ area.addr1 }} {{ area.addr2 }}</td>
          <td>{{ area.latitude }}</td>
          <td>{{ area.longitude }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 관광지 검색 end -->
</template>

<style scoped></style>
