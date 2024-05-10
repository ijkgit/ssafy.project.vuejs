<script setup>
import { ref, watch } from "vue";
const props = defineProps({ area: Object });
const isShow = ref(false);
console.log(props.area);
const areaWatch = watch(
  () => props.area,
  () => {
    if (props.area) {
      console.log(props.area);
      bg.value = true;
      document.body.style.overflow = "hidden";
    }
  },
  {
    deep: true,
  }
);

const emit = defineEmits(["close"]);

const bg = ref(false);
function close() {
  bg.value = false;
  document.body.style.overflow = "auto";
  console.log(document.body.style.overflow);
  emit("close", true);
}
</script>
<template>
  <div class="modal fade" aria-labelledby="myModalLabel">
    <div class="modal-bg" v-show="bg"></div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel"></h5>
        </div>
        <div class="modal-body">
          <!-- 모달 내용 -->
          <div class="d-flex flex-column align-items-center" id="modalContent">
            {{ area.title }}
            <img style="max-width: 80%; height: auto" :src="area.image" /><br />
            <div>주소: {{ area.addr }}</div>
            <div v-if="area.tel">연락처: {{ area.tel }}</div>
            <div v-if="area.overview">설명: {{ area.overview }}</div>
            <a v-if="area.homepage" :href="area.homepage">홈페이지 바로가기</a>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  display: block;
}

.fade:not(.show) {
  opacity: 0;
}

.modal-dialog {
  z-index: 1000;
}

.modal-bg {
  position: fixed;
  z-index: 999;
  width: 1000rem;
  height: 1000rem;
  background-color: gray;
  opacity: 0.7;
  overflow: hidden;
}
</style>
