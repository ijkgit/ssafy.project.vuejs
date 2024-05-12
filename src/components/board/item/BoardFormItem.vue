<script setup>
import { writeArticleAPI,getArticleAPI, updateArticleAPI } from "@/apis/board";
import {onMounted, ref} from 'vue'
import { useRouter,useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const articleNo = route.params.articleNo;

const props = defineProps({ type: String });

const article = ref({
  articleNo: "",
  userId: "admin",
  subject: "",
  content: "",
  hit: 0,
  memoCnt : 0,
  registerTime: "",
})


const WriteArticleHandler = async() =>{
    const response = await writeArticleAPI(article.value);
	console.log(response);
    router.push({name : "article-list"})
}

const getArticle = async() =>{
    const response = await getArticleAPI(articleNo);
    article.value = response.data.article;
}

const UpdateArticleHandler = async() =>{
    console.log(article.value)
    const response = await updateArticleAPI(article.value,articleNo);
    console.log(response);
    router.push({name : 'article-view', params : {articleNo : articleNo} })
}

onMounted( ()=>{
	if(props.type ==='modify') getArticle();
})

</script>

<template>
    <div class="col-lg-8 col-md-10 col-sm-12" v-if="type ==='write'">
				<form id="form-register" method="POST" action="">
					<input type="hidden" name="action" value="write">
					<div class="mb-3">
						<label for="subject" class="form-label">제목 : </label> <input
							type="text" class="form-control" id="subject" name="subject"
                            v-model="article.subject"
							placeholder="제목..." />
					</div>
					<div class="mb-3">
						<label for="content" class="form-label">내용 : </label>
						<textarea class="form-control" id="content" name="content"
							rows="7" v-model="article.content"></textarea>
					</div>
					<div class="col-auto text-center">
						<button type="button" id="btn-register"
							class="btn btn-outline-primary mb-3" @click="WriteArticleHandler">글작성</button>
						<button type="reset" class="btn btn-outline-danger mb-3">초기화</button>
					</div>
				</form>
	</div>

    <div class="col-lg-8 col-md-10 col-sm-12" v-if="type ==='modify'">
				<form id="form-modify" method="POST" action="">
					<div class="mb-3">
						<label for="subject" class="form-label">작성자 ID : </label> <input
							type="text" class="form-control" id="userId" name="userId"
							:value="article.userId" disabled />
					</div>
					<div class="mb-3">
						<label for="subject" class="form-label">제목 : </label> <input
                            v-model="article.subject"
							type="text" class="form-control" id="subject" name="subject"
						/>
					</div>
					<div class="mb-3">
						<label for="content" class="form-label">내용 : </label>
						<textarea v-model="article.content" class="form-control" id="content" name="content"
							rows="7" ></textarea>
					</div>
					<div class="col-auto text-center">
						<button type="button" id="btn-modify"
							class="btn btn-outline-primary mb-3" @click="UpdateArticleHandler">글수정</button>
						<button type="button" id="btn-list" @click="router.push({name : 'article-list'})"
							class="btn btn-outline-danger mb-3">목록으로이동...</button>
					</div>
				</form>
		</div>
</template>

<style scoped>

</style>