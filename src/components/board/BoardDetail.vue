<script setup>
import {delteArticleAPI, getArticleAPI} from '@/apis/board.js'
import { ref, onMounted } from "vue";
import { useRoute,useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const articleNo = route.params.articleNo;
const article = ref({
  articleNo: "",
  userId: "ssafy",
  subject: "",
  content: "",
  hit: 0,
  memoCnt : 0,
  registerTime: "",
})

const memos =ref([]);
const getArticle = async() =>{
    const response = await getArticleAPI(articleNo);
    article.value = response.data.article;
}

const articleDeleteHandler = async() =>{
    const response = await delteArticleAPI(articleNo);
    alert(response.data.msg)
    router.push({name : 'article-list'})
}
onMounted( ()=>{
    getArticle();
})
</script>

<template>
    <div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-10 col-sm-12">
				<h2 class="my-3 py-3 shadow-sm bg-light text-center">글보기</h2>
			</div>
			<div class="col-lg-8 col-md-10 col-sm-12">
				<div class="row my-2">
					<h2 class="text-secondary px-5">{{article.subject}}</h2>
				</div>
				<div class="row">
					<div class="col-md-8">
						<div class="clearfix align-content-center">
							<img class="avatar me-2 float-md-start bg-light p-2"
								src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg" />
							<p>
								<span class="fw-bold">{{article.userId}}</span> <br /> <span
									class="text-secondary fw-light"> {{article.registerTime}}
									조회 : {{article.hit}} </span>
							</p>
						</div>
					</div>
					<div class="col-md-4 align-self-center text-end">댓글 :
						{{memos.length}}</div>
					<div class="divider mb-3"></div>
					<div class="text-secondary">{{article.content}}</div>
					<div class="divider mt-3 mb-3"></div>
					<div class="d-flex justify-content-end">
                        <RouterLink :to="{name : 'article-list'}">
                            <button type="button" id="btn-list"
							class="btn btn-outline-primary mb-3">글목록</button>
                        </RouterLink>
						
						<c:if test="${login eq article.userId }">
							<RouterLink :to="{name : 'article-modify'}">
                                <button type="button" id="btn-mv-modify"
                                    class="btn btn-outline-success mb-3 ms-1">글수정</button>
                            </RouterLink>
							<button type="button" id="btn-delete"
								class="btn btn-outline-danger mb-3 ms-1" @click="articleDeleteHandler">글삭제</button>
						</c:if>

					</div>
				</div>
			</div>
			<!-- 
                <div class="col-lg-8 col-md-10 col-sm-12">
				댓글 입력 폼
				<form action="${root}/board.do/comment" method="post"
					class="row align-items-center">
					<input type="hidden" name="articleno" value={{article.articleNo}}>
					<input type="hidden" name="parentmemono" value="">
					<div class="form-group ">
						<label for="comment">댓글 작성</label>
						<textarea class="form-control" id="comment" name="comment"
							rows="3"></textarea>
						<div class="text-end">
							<button type="submit" id="btn-comment-register" class="btn mt-1">댓글
								작성</button>
						</div>
					</div>
				</form>
				<br /> <br />
				기존 댓글 출력
				<c:if test="${not empty memos}">
					<h5>등록된 댓글 보기 </h5>
					<c:forEach var="memo" items="${memos}">
						<c:if test="${memo.parentMemoNo eq 0 }">
							<div class="card mt-2 mb-2" style="margin-left: 0px;">
								<div class="card-body">
									<div class="d-flex justify-content-between">
										<span class="text-muted">작성자: ${memo.userId} | 작성일:
											${memo.memoTime}</span>
										<c:if test="${login eq memo.userId}">
											<form action="${root}/board.do/comment"
												method="get" style="display: inline;">
												<input type="hidden" name="memono" value={{memo.memoNo}}>
												<button type="submit"
													class="btn btn-outline-danger mb-3 ms-1">댓글 삭제</button>
											</form>
										</c:if>
									</div>
									<div class="mt-2">{{memo.comment}}</div>
									<div class="text-end mt-2">
										<button type="button" class="btn btn-outline-secondary" 
											onclick="showCommentForm(${memo.memoNo})">댓글 달기</button>
									</div>
									대댓글 표시
									<c:forEach var="reply" items="${memos}" varStatus="loop">
										<c:if test="${reply.parentMemoNo == memo.memoNo}">
											<div class="card mt-2" style="margin-left: 20px;">
												<div class="card-body">
													<div class="d-flex justify-content-between">
														<span class="text-muted">작성자: ${reply.userId} | 작성일:
															${reply.memoTime}</span>
														<c:if test="${login eq reply.userId}">
															<form action="${root}/board.do/comment"
																method="get" style="display: inline;">
																<input type="hidden" name="memono"
																	value="${reply.memoNo}">
																<button type="submit"
																	class="btn btn-outline-danger mb-3 ms-1">댓글 삭제</button>
															</form>
														</c:if>
													</div>
													<div class="mt-2">${reply.comment}</div>
												</div>
											</div>
										</c:if>
									</c:forEach>
									대댓글 입력 폼
									<form action="${root}/board.do/comment"
										method="post" class="row align-items-center mt-2"
										id="commentForm_${memo.memoNo}" style="display: none;">
										<input type="hidden" name="articleno"
											value="${article.articleNo}"> <input type="hidden"
											name="parentmemono" value="${memo.memoNo}">
										<div class="form-group col-md-12">
											<textarea class="form-control" name="comment" rows="3"
												placeholder="댓글을 입력하세요"></textarea>
										</div>
										<div class="form-group col-md-12 text-end">
											<button type="submit" id="btn-comment-comment-register" class="btn mt-1">댓글 작성 </button>
										</div>
									</form>
								</div>
							</div>
						</c:if>
					</c:forEach>
				</c:if>
			</div>
             -->
		</div>
	</div>
</template>

<style scoped>

</style>