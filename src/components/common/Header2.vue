<script setup>
import { RouterLink } from "vue-router";
import { getLocalStorageToken } from "../util/LocalStroage";
console.log("if u header2");
</script>

<template>
  <!-- 상단 nav bar -->
  <div id="nav" class="navbar-expand-lg border-bottom shadow-sm">
    <div class="container">
      <header class="d-flex align-items-center justify-content-around py-3">
        <RouterLink to="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <h1 id="header">나들이</h1>
        </RouterLink>
        <button
          class="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="black"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>

        <div id="nav-menu" class="collapse navbar-collapse justify-content-end">
          <ul class="nav col-12 col-md-auto mb-2 mb-md-0">
            <li><a id="nav-list" href="#" class="nav-link px-2">핫플 자랑하기</a></li>
            <li>
              <a
                id="nav-list"
                href="#"
                class="nav-link px-2"
                onclick="javascript:goMyTourismPlanList();"
                >나의 여행 계획</a
              >
            </li>
            <li>
              <a id="nav-list" href="#" class="nav-link px-2" onclick="javascript:goLocalTourism();"
                >지역별 여행지</a
              >
            </li>
            <li>
              <RouterLink to ="/board"
                id="nav-list"
                class="nav-link px-2">여행 정보 공유
                </RouterLink>
            </li>
          </ul>
          <!-- <c:if test="${empty login}"> -->
          <form id="signInFail" class="ms-5" v-if="!getLocalStorageToken()">
            <RouterLink to="/signup">
              <button
                id="primary-outline-button"
                type="button"
                class="btn btn-outline-primary me-2"
              >
                회원가입
              </button>
            </RouterLink>
            <RouterLink to="/signin">
              <button
                id="primary-button"
                type="button"
                class="btn btn-primary"
              >
                로그인
              </button>
            </RouterLink>
          </form>
          <!-- </c:if> -->
          <!-- <c:if test="${not empty login}"> -->
          <form id="signInSuccess" class="col-md-3 text-end" v-else>
            <button
              id="primary-outline-button"
              type="button"
              class="btn btn-outline-primary me-2"
              onclick="javascript:goMyPage();"
            >
              마이페이지
            </button>
            <button
              id="primary-button"
              type="button"
              class="btn btn-primary"
              onclick="javascript:goSignOut();"
            >
              로그아웃
            </button>
          </form>
          <!-- </c:if> -->
        </div>
      </header>
    </div>
  </div>
</template>

<style scoped></style>
