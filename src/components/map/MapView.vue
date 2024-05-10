<script setup>
import { ref, onMounted, watch } from "vue";
import { Axios } from "@/util/http-commons.js";

const http = Axios("map");
const sidos = ref([]);
const guguns = ref([]);
const searchData = ref({
  areaCode: 0,
  gugunCode: 0,
  contentTypeId: 0,
  keyword: "",
});

onMounted(() => {
  getSido();
});

const init = () => {
  searchData.value.gugunCode = 0;
};

const getSido = () => {
  http.get("sido").then((response) => {
    sidos.value = response.data;
  });
};

const sidoWatch = watch(
  () => searchData.value.areaCode,
  () => {
    init();
    getGugun();
  },
  {
    deep: true,
  }
);

const getGugun = () => {
  http.get(`gugun/${searchData.value.areaCode}`).then((response) => {
    guguns.value = response.data;
  });
};

const search = () => {
  http.post("attractioninfo", searchData.value).then((response) => {
    console.log(response);
  });
};
</script>

<template>
  <div class="container-md">
    <!-- 관광지 검색 start -->
    <form class="d-flex my-5 mx-5" onsubmit="return false;" role="search">
      <select
        id="search-area"
        class="form-select me-2"
        name="sidoCode"
        v-model="searchData.areaCode"
      >
        <option value="0">검색 할 지역 선택</option>
        <option v-for="sido in sidos" :key="sido.sidoCode" :value="sido.sidoCode">
          {{ sido.sidoName }}
        </option>
      </select>
      <select
        id="search-gugun"
        class="form-select me-2"
        name="gugunCode"
        v-model="searchData.gugunCode"
      >
        <option value="0">구군 선택</option>
        <option v-for="gugun in guguns" :key="gugun.gugunCode" :value="gugun.gugunCode">
          {{ gugun.gugunName }}
        </option>
      </select>
      <select id="search-content-id" class="form-select me-2" v-model="searchData.contentTypeId">
        <option value="0" selected>관광지 유형</option>
        <option value="12">관광지</option>
        <option value="14">문화시설</option>
        <option value="15">축제공연행사</option>
        <option value="25">여행코스</option>
        <option value="28">레포츠</option>
        <option value="32">숙박</option>
        <option value="38">쇼핑</option>
        <option value="39">음식점</option>
      </select>
      <input
        id="search-keyword"
        class="form-control me-2"
        type="search"
        placeholder="검색어"
        aria-label="검색어"
        v-model="searchData.keyword"
      />
      <button id="btn-search" class="btn btn-outline-success" type="button" @click="search">
        검색
      </button>
    </form>
    <!-- kakao map start -->
    <div id="map" class="mt-3" style="width: 100%; height: 600px"></div>
    <!-- kakao map end -->
    <!--  모달 -->
    <div
      class="modal fade"
      id="myModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel"></h5>
          </div>
          <div class="modal-body">
            <!-- 모달 내용 -->
            <div class="d-flex flex-column align-items-center" id="modalContent"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <table class="table table-striped" style="display: none">
        <thead>
          <tr>
            <th>대표이미지</th>
            <th>관광지명</th>
            <th>주소</th>
            <th>위도</th>
            <th>경도</th>
          </tr>
        </thead>
        <tbody id="trip-list"></tbody>
      </table>
    </div>
    <!-- 관광지 검색 end -->
  </div>
</template>

<style scoped>
#btn-search {
  color: var(--secondary-color);
  border-color: var(--secondary-color);
  white-space: nowrap;
}

#btn-search:hover {
  color: white;
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
