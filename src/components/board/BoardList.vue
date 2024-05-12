<script setup>
import { ref, onMounted } from "vue";
import {getArticleListAPI} from "@/apis/board.js";
import BoardListItem from "@/components/board/item/BoardListItem.vue";
import VSelect from "@/components/common/VSelect.vue";
import PageNavigation from "@/components/common/PageNavigation.vue";

const articles = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "article_no" },
  { text: "제목", value: "subject" },
  { text: "작성자아이디", value: "user_id" },
]);

const sortOption = ref([
  { text: "정렬조건", value: "" },
  { text: "최신순", value: "article_no" },
  { text: "조회수순", value: "hit" },
  { text: "댓글순", value: "user_id" },
]);

const changeKey = (val) => {
  console.log("BoarList에서 선택한 조건 : " + val);
  param.value.key = val;
};



const getArticleList  = async()=>{
    const response = await getArticleListAPI(param.value);
    console.log(response)
    articles.value = response.data.articles;
	currentPage.value = response.data.currentPage;
	totalPage.value = response.data.totalPage;
}
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});


onMounted(() => {
  getArticleList();
});

const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  param.value.pgno = val;
	getArticleList();
};


</script>

<template>
    <div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-10 col-sm-12">
				<h2 class="my-3 py-3 shadow-sm bg-light text-center">글목록</h2>
			</div>
			<div class="col-lg-8 col-md-10 col-sm-12">
				<div class="row align-self-center mb-2">
					<div class="col-md-2 text-start">
						<RouterLink to="write">
							<button type="button" id="btn-mv-register"
							class="btn btn-outline-primary btn-sm">글쓰기</button>
						</RouterLink>
						
					</div>
					<div class="col-md-7 offset-3">
						<form id="form-search" class="d-flex">
							<!-- <input type="hidden" name="action" value="list" />  -->
							<input type="hidden" name="pgno" value="1" />
                            <VSelect :selectOption="selectOption" @onKeySelect="changeKey" />
							<div class="input-group input-group-sm">
								<input v-model="param.word" id="word" name="word" type="text" class="form-control"
									placeholder="검색어..." />
								<button id="btn-search" class="btn btn-dark" type="button" @click="getArticleList">검색</button>
							</div>
						</form>
						<form id="form-sort " class="mt-1 d-flex justify-content-end">
                            <VSelect :selectOption="sortOption"/>
							<!-- <c:choose>
								<c:when test="${empty sort}">
									<select id="sortKey_default" name="sortKey_default "
										class="form-select form-select-sm ms-5 me-1 w-50 "
										aria-label="정렬조건" onchange="sort(this.value)">
										<option value="" selected>정렬조건</option>
										<option value="article_no">최신순</option>
										<option value="hit">조회수순</option>
										<option value="memo_cnt">댓글순</option>
									</select>
								</c:when>
								<c:when test="${sort eq 'article_no'}">
									<select id="sortKey_article_no" name="sortKey_article_no"
										class="form-select form-select-sm ms-5 me-1 w-50 float-right"
										aria-label="정렬조건" onchange="sort(this.value)">
										<option value="">정렬조건</option>
										<option value="article_no" selected>최신순</option>
										<option value="hit">조회수순</option>
										<option value="memo_cnt">댓글순</option>
									</select>
								</c:when>
								<c:when test="${sort eq 'hit'}">
									<select id="sortKey_hit" name="sortKey_hit"
										class="form-select form-select-sm ms-5 me-1 w-50"
										aria-label="정렬조건" onchange="sort(this.value)">
										<option value="">정렬조건</option>
										<option value="article_no">최신순</option>
										<option value="hit" selected>조회수순</option>
										<option value="memo_cnt">댓글순</option>
									</select>
								</c:when>
								<c:when test="${sort eq 'memo_cnt'}">
									<select id="sortKey_memo_cnt" name="sortKey_memo_cnt"
										class="form-select form-select-sm ms-5 me-1 w-50"
										aria-label="정렬조건" onchange="sort(this.value)">
										<option value="">정렬조건</option>
										<option value="article_no">최신순</option>
										<option value="hit">조회수순</option>
										<option value="memo_cnt" selected>댓글순</option>
									</select>
								</c:when>
							</c:choose> -->
						</form>
					</div>
				</div>
				<table class="table table-hover">
					<thead>
						<tr class="text-center">
							<th scope="col">글번호</th>
							<th scope="col">제목</th>
							<th scope="col">작성자</th>
							<th scope="col">조회수</th>
							<th scope="col">댓글수</th>
							<th scope="col">작성일</th>
						</tr>
					</thead>
					<tbody>
						<BoardListItem v-for="article in articles" :key="article.articleNo"  :article="article"/>
					</tbody>
				</table>
			</div>
			<PageNavigation
				:current-page="currentPage"
				:total-page="totalPage"
				@pageChange="onPageChange"
			></PageNavigation>
		</div>
	</div>

	<form id="form-param" method="get" action="">
		<input type="hidden" id="p-action" name="action" value=""> <input
			type="hidden" id="p-pgno" name="pgno" value=""> <input
			type="hidden" id="p-key" name="key" value=""> <input
			type="hidden" id="p-word" name="word" value=""><input
			type="hidden" id="p-sort" name="sort" value="${sort}">
	</form>
</template>

<style scoped>

</style>