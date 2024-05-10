<script setup>
import MapModal from "@/components/map/item/item/MapModal.vue";
import { onMounted, ref, watch, toRaw } from "vue";
import image12 from "@/assets/img/marker/지도_마커_관광지.png";
import image14 from "@/assets/img/marker/지도_마커_문화시설.png";
import image15 from "@/assets/img/marker/지도_마커_축제공연행사.png";
import image25 from "@/assets/img/marker/지도_마커_여행코스.png";
import image28 from "@/assets/img/marker/지도_마커_레포츠.png";
import image32 from "@/assets/img/marker/지도_마커_숙박.png";
import image38 from "@/assets/img/marker/지도_마커_쇼핑.png";
import image39 from "@/assets/img/marker/지도_마커_식당.png";
import { Axios } from "@/util/http-commons.js";

const props = defineProps({
  areas: Object,
  contentTypeId: String,
});
const area = ref({
  image: "",
  title: "",
  addr: "",
  homepage: "",
  overview: "",
  tel: "",
});

const http = Axios("map");
const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;
let map = null;
const positions = ref([]);
const isShow = ref(false);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    loadScript();
  }
});

const loadScript = () => {
  const script = document.createElement("script");
  script.onload = () => kakao.maps.load(initMap);
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_MAP_API_KEY}`;
  document.head.appendChild(script);
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(36.35559977190671, 127.29859991863871),
    level: 5,
  };

  map = new kakao.maps.Map(container, options);
};

const areasWatch = watch(
  () => props.areas.value,
  () => {
    positions.value = [];
    console.log(props.areas);
    props.areas.forEach((area) => {
      const markerInfo = {
        contentId: area.contentId,
        title: area.title,
        latlng: new kakao.maps.LatLng(area.latitude, area.longitude),
        firstimage: area.firstImage,
        tel: area.tel,
        addr1: area.addr1,
        addr2: area.addr2,
      };
      positions.value.push(markerInfo);
    });
    displayMarker();
  },
  {
    deep: true,
  }
);

const displayMarker = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(36.35559977190671, 127.29859991863871),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  let contentTypeId = parseInt(props.contentTypeId);
  let selectedImage;
  if (contentTypeId === 12) selectedImage = image12;
  else if (contentTypeId === 14) selectedImage = image14;
  else if (contentTypeId === 15) selectedImage = image15;
  else if (contentTypeId === 25) selectedImage = image25;
  else if (contentTypeId === 28) selectedImage = image28;
  else if (contentTypeId === 32) selectedImage = image32;
  else if (contentTypeId === 38) selectedImage = image38;
  else if (contentTypeId === 39) selectedImage = image39;
  else selectedImage = imageSrc;

  var imageSize =
    selectedImage === imageSrc ? new kakao.maps.Size(25, 35) : new kakao.maps.Size(35, 35);

  var markerImage = new kakao.maps.MarkerImage(selectedImage, imageSize);
  for (var i = 0; i < positions.value.length; i++) {
    var marker = new kakao.maps.Marker({
      map: toRaw(map), // 마커를 표시할 지도
      position: positions.value[i].latlng, // 마커를 표시할 위치
      image: markerImage, // 마커 이미지
    });

    kakao.maps.event.addListener(marker, "click", showDetail(positions.value[i]));
  }
  // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
  toRaw(map).setCenter(positions.value[0].latlng);
};

const showDetail = (position) => {
  console.log(position);
  console.log(position.image);
  return async () => {
    area.value.image = position.firstimage
      ? position.firstimage
      : "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png";
    area.value.title = position.title;
    area.value.addr = `${position.addr1} ${position.addr2}`;

    await http.get(`/attractiondescription/${position.contentId}`).then((response) => {
      if (response.data.homepage) area.value.homepage = response.data.hompage;
      if (response.data.overview) area.value.homepage = response.data.overview;
      if (response.data.telName) area.value.homepage = response.data.telName;
    });

    isShow.value = true;
  };
};

const close = () => {
  isShow.value = false;
};
</script>

<template>
  <div id="map" class="mt-3" style="width: 100%; height: 600px"></div>
  <MapModal :area="area" v-show="isShow" @close="close" :class="{ show: isShow }"></MapModal>
</template>

<style scoped></style>
