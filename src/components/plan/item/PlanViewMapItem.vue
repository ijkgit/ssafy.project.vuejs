<script setup>
import { ref, onMounted, watch, onUpdated } from "vue";
const props = defineProps({
  plan: Array,
});

const { VITE_KAKAO_MAP_API_KEY } = import.meta.env;
let map = null;

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
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${VITE_KAKAO_MAP_API_KEY}&libraries=services`;
  document.head.appendChild(script);
};

const initMap = () => {
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(36.35559977190671, 127.29859991863871),
    level: 5,
  };

  map = new kakao.maps.Map(container, options);
  //   makeRoute();
  places.value.forEach((place) => {
    addPlace(place);
  });
};

const addPlace = (place) => {
  makeRoute(place);
  makeMarker(place);
};

const makeMarker = (place) => {
  var position = new kakao.maps.LatLng(place.y, place.x);
  var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, place.planPathIdx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

  marker.setMap(map); // 지도 위에 마커를 표출합니다
};

const places = ref([]);
const setPlaceType = watch(
  () => props.plan,
  (plans) => {
    console.log(props.plan);
    console.log(plans);
    plans.forEach((plan) => {
      plan.placeUrl === ""
        ? "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
        : plan.placeUrl;
      const place = {
        planPathIdx: plan.planPathIdx,
        address_name: plan.addressName,
        category_group_code: "AT4", // 이 값은 예시로 설정된 것임
        category_group_name: "관광명소",
        category_name: "여행 > 관광,명소 > 테마거리",
        distance: "", // 필요에 따라 설정
        id: plan.planPathIdx,
        phone: plan.phone,
        place_name: plan.placeName,
        place_url: plan.placeUrl, // 혹은 다른 적절한 속성
        road_address_name: plan.addressName,
        x: plan.x,
        y: plan.y,
      };
      places.value.push(place);
    });
    console.log(places.value);
    // makeRoute();
  },
  {
    deep: true,
  }
);

var drawingFlag = false; // 선이 그려지고 있는 상태를 가지고 있을 변수입니다
var moveLine; // 선이 그려지고 있을때 마우스 움직임에 따라 그려질 선 객체 입니다
var clickLine; // 마우스로 클릭한 좌표로 그려질 선 객체입니다
var distanceOverlay; // 선의 거리정보를 표시할 커스텀오버레이 입니다
var dots = {}; // 선이 그려지고 있을때 클릭할 때마다 클릭 지점과 거리를 표시하는 커스텀 오버레이 배열입니다.

const makeRoute = (place) => {
  console.log("makeRoute");
  console.log(place);
  var latlng = new kakao.maps.LatLng(place.y, place.x);
  var clickPosition = latlng;
  if (place.planPathIdx == 0) {
    drawingFlag = true;
    deleteClickLine();
    deleteDistnce();
    deleteCircleDot();
    clickLine = new kakao.maps.Polyline({
      map: map, // 선을 표시할 지도입니다
      path: [clickPosition], // 선을 구성하는 좌표 배열입니다 클릭한 위치를 넣어줍니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#db4040", // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    // 선이 그려지고 있을 때 마우스 움직임에 따라 선이 그려질 위치를 표시할 선을 생성합니다
    moveLine = new kakao.maps.Polyline({
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: "#db4040", // 선의 색깔입니다
      strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid", // 선의 스타일입니다
    });

    displayCircleDot(clickPosition, 0);
  } else {
    var path = clickLine.getPath();

    path.push(clickPosition);
    clickLine.setPath(path);
    var path = clickLine.getPath();

    if (path.length > 1) {
      if (dots[dots.length - 1].distance) {
        dots[dots.length - 1].distance.setMap(null);
      }

      var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
        content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

      showDistance(content, path[path.length - 1]);
    }
    var distance = Math.round(clickLine.getLength());
    displayCircleDot(clickPosition, distance);
  }

  console.log(clickLine);
};

function deletePlace(index) {
  var cursor = getCursor(index);
  c = confirm("정말 삭제하시겠어요?");
  if (c) {
    deleteRoute(cursor);
    removeMarker2(cursor);
    if (curInfoWindow) {
      curInfoWindow.close();
    }
    removeTimeLine(index);
  }
}

function removeTimeLine(index) {
  var newDeleteButton = document.querySelector(`#timeline-${index}`);
  if (newDeleteButton) {
    newDeleteButton.remove();
  }
}

function removeMarker2(index) {
  markers2[index].setMap(null);
  markers2.splice(index, 1);
  for (var i = 0; i < markers2.length; i++) {
    markers2[i].setMap(map); // 지도 위에 마커를 표출합니다
  }
}

function deleteRoute(index) {
  // 그려지고 있는 선의 좌표 배열을 얻어옵니다
  var path = clickLine.getPath();

  if (path.length == 1) {
    // 지도 위에 선이 표시되고 있다면 지도에서 제거합니다
    deleteClickLine();

    // 지도 위에 커스텀오버레이가 표시되고 있다면 지도에서 제거합니다
    deleteDistnce();

    // 지도 위에 선을 그리기 위해 클릭한 지점과 해당 지점의 거리정보가 표시되고 있다면 지도에서 제거합니다
    deleteCircleDot();
    placeIndex = 0;
    return;
  }

  // 좌표 배열에 클릭한 위치를 추가합니다
  if (dots[index].circle) {
    dots[index].circle.setMap(null);
  }

  if (dots[index].distance) {
    dots[index].distance.setMap(null);
  }
  path.splice(index, 1);
  dots.splice(index, 1);

  // 다시 선에 좌표 배열을 설정하여 클릭 위치까지 선을 그리도록 설정합니다
  clickLine.setPath(path);

  // 마우스 클릭으로 그린 선의 좌표 배열을 얻어옵니다
  var path = clickLine.getPath();

  // 마지막 클릭 지점에 대한 거리 정보 커스텀 오버레이를 지웁니다
  if (dots[dots.length - 1].distance) {
    dots[dots.length - 1].distance.setMap(null);
    dots[dots.length - 1].distance = null;
  }

  var distance = Math.round(clickLine.getLength()), // 선의 총 거리를 계산합니다
    content = getTimeHTML(distance); // 커스텀오버레이에 추가될 내용입니다

  distanceOverlay.setMap(null);
  distanceOverlay = null;

  // 그려진 선의 거리정보를 지도에 표시합니다
  showDistance(content, path[path.length - 1]);
}

// 클릭으로 그려진 선을 지도에서 제거하는 함수입니다
function deleteClickLine() {
  if (clickLine) {
    clickLine.setMap(null);
    clickLine = null;
  }
}

// 마우스 드래그로 그려지고 있는 선의 총거리 정보를 표시하거
// 마우스 오른쪽 클릭으로 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 생성하고 지도에 표시하는 함수입니다
function showDistance(content, position) {
  if (distanceOverlay) {
    // 커스텀오버레이가 생성된 상태이면

    // 커스텀 오버레이의 위치와 표시할 내용을 설정합니다
    distanceOverlay.setPosition(position);
    distanceOverlay.setContent(content);
  } else {
    // 커스텀 오버레이가 생성되지 않은 상태이면

    // 커스텀 오버레이를 생성하고 지도에 표시합니다
    distanceOverlay = new kakao.maps.CustomOverlay({
      map: map, // 커스텀오버레이를 표시할 지도입니다
      content: content, // 커스텀오버레이에 표시할 내용입니다
      position: position, // 커스텀오버레이를 표시할 위치입니다.
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3,
    });
  }
}

// 그려지고 있는 선의 총거리 정보와
// 선 그리가 종료됐을 때 선의 정보를 표시하는 커스텀 오버레이를 삭제하는 함수입니다
function deleteDistnce() {
  if (distanceOverlay) {
    distanceOverlay.setMap(null);
    distanceOverlay = null;
  }
}

// 선이 그려지고 있는 상태일 때 지도를 클릭하면 호출하여
// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 표출하는 함수입니다
function displayCircleDot(position, distance) {
  // 클릭 지점을 표시할 빨간 동그라미 커스텀오버레이를 생성합니다
  var circleOverlay = new kakao.maps.CustomOverlay({
    content: '<span class="dot"></span>',
    position: position,
    zIndex: 1,
  });

  // 지도에 표시합니다
  circleOverlay.setMap(map);

  if (distance > 0) {
    // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
    var distanceOverlay = new kakao.maps.CustomOverlay({
      content:
        '<div class="dotOverlay">거리 <span class="number">' +
        distance +
        "</span>m</div>",
      position: position,
      yAnchor: 1,
      zIndex: 2,
    });

    // 지도에 표시합니다
    distanceOverlay.setMap(map);
  }

  // 배열에 추가합니다
  dots.push({ circle: circleOverlay, distance: distanceOverlay });
}

// 클릭 지점에 대한 정보 (동그라미와 클릭 지점까지의 총거리)를 지도에서 모두 제거하는 함수입니다
function deleteCircleDot() {
  var i;

  for (i = 0; i < dots.length; i++) {
    if (dots[i].circle) {
      dots[i].circle.setMap(null);
    }

    if (dots[i].distance) {
      dots[i].distance.setMap(null);
    }
  }

  dots = [];
}

// 마우스 우클릭 하여 선 그리기가 종료됐을 때 호출하여
// 그려진 선의 총거리 정보와 거리에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance) {
  // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
  var walkkTime = (distance / 67) | 0;
  var walkHour = "",
    walkMin = "";

  // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
  if (walkkTime > 60) {
    walkHour =
      '<span class="number">' + Math.floor(walkkTime / 60) + "</span>시간 ";
  }
  walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

  // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
  var bycicleTime = (distance / 227) | 0;
  var bycicleHour = "",
    bycicleMin = "";

  // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
  if (bycicleTime > 60) {
    bycicleHour =
      '<span class="number">' + Math.floor(bycicleTime / 60) + "</span>시간 ";
  }
  bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

  // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
  var content = '<ul class="dotOverlay distanceInfo">';
  content += "    <li>";
  content +=
    '        <span class="label">총거리</span><span class="number">' +
    distance +
    "</span>m";
  content += "    </li>";
  content += "    <li>";
  content += '        <span class="label">도보</span>' + walkHour + walkMin;
  content += "    </li>";
  content += "    <li>";
  content +=
    '        <span class="label">자전거</span>' + bycicleHour + bycicleMin;
  content += "    </li>";
  content += "</ul>";

  return content;
}
</script>

<template>
  <main class="container-md mt-2 mb-5">
    <div class="map_wrap">
      <div id="map" class="mt-3" style="width: 100%; height: 600px"></div>
      <div id="menu_wrap" class="bg_white" style="left: 0">
        <hr />
        <ul id="myPlacesList">
          <li v-for="p in plan" :key="p.planPathIdx" class="item">
            <span class="markerbg marker_"></span>
            <div class="info mt-2">
              <h5>{{ p.placeName }}</h5>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "@/assets/plan/map.css";
</style>
