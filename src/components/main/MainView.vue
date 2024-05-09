<script setup></script>

<template>
  <!-- <div>MainView</div> -->
  <div id="carouselExampleCaptions" class="carousel slide main-content" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="main-content-img-cover"></div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="@/assets/img/trip/구례_섬진강.jpg"
          class="d-block w-100 main-content-img"
          alt="전남 구례 섬진강"
        />
        <div class="carousel-caption carousel-title">
          <h1>JEONNAM</h1>
          <p>구례 섬진강</p>
          <p class="lead d-flex justify-content-center">
            <a
              id="primary-button"
              href="#"
              class="btn btn-primary fw-bold"
              onclick="javascript:goDetail('구례 섬진강');return false;"
              >자세히 보기</a
            >
          </p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="@/assets/img/trip/부산_광안대교.jpg"
          class="d-block w-100 main-content-img"
          alt="구산 광안대교"
        />
        <div class="carousel-caption carousel-title">
          <h1>BUSAN</h1>
          <p>광안대교</p>
          <p class="lead d-flex justify-content-center">
            <a
              id="primary-button"
              href="#"
              class="btn btn-primary fw-bold"
              onclick="javascript:goDetail('광안대교');return false;"
              >자세히 보기</a
            >
          </p>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="@/assets/img/trip/경주_동궁과월지.jpg"
          class="d-block w-100 main-content-img"
          alt="경주 동궁과 월지"
        />
        <div class="carousel-caption carousel-title">
          <h1>GYEONGJU</h1>
          <p>동궁과 월지</p>
          <p class="lead d-flex justify-content-center">
            <a
              id="primary-button"
              href="#"
              class="btn btn-primary fw-bold"
              onclick="javascript:goDetail('동궁과 월지');return false;"
              >자세히 보기</a
            >
          </p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev carousel-control"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next carousel-control"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
@import "@/assets/main/main.css";
</style>
