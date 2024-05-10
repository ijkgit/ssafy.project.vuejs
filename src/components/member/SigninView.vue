<script setup>

</script>

<template>
    <main class="form-signin w-100 m-auto">
		<form id="form" method="post" action="/member.do/signin">
			<img class="mb-4" src="@/assets/img/1.png" alt="" width="130"
				height="130" />
			<h1 class="h3 mb-3 fw-normal">로그인 해주세요</h1>
			<div class="form-floating">
				<c:if test="${empty rememberId}">
					<input type="text" class="form-control" id="id" name="userid"
						placeholder="" />
					<label for="id">아이디</label>
				</c:if>
				<c:if test="${not empty rememberId}">
					<input type="text" class="form-control" id="id"
						value="${rememberId}" name="userid" placeholder="" />
					<label for="id">아이디</label>
				</c:if>
			</div>
			<br />
			<div class="form-floating">
				<input type="password" class="form-control" id="pw"
					name="userpassword" placeholder="" /> <label for="pw">비밀번호</label>
			</div>
			<c:out value="${msg }" />
			<br />
			<div class="form-check text-start my-3">
				<c:if test="${empty rememberId}">
					<input class="form-check-input" type="checkbox"
						id="flexCheckDefault" name="flexCheckDefault" />
					<label class="form-check-label" for="flexCheckDefault">아이디
						저장</label>
				</c:if>
				<c:if test="${not empty rememberId}">
					<input class="form-check-input" type="checkbox"
						id="flexCheckDefault" name="flexCheckDefault" checked />
					<label class="form-check-label" for="flexCheckDefault">아이디
						저장</label>
				</c:if>

			</div>
			<div>
				<button id="signInBtn" class="btn btn-primary w-100 py-2"
					type="button" onclick="javascript:signIn();">로그인 하기</button>
				<button id="findPwBtn" class="btn btn-outline-primary w-100 py-2"
					type="button" onclick="javascript:findPw();">비밀번호 찾기</button>
			</div>
		</form>
	</main>
</template>

<style scoped>
@import "@/assets/main/main.css";
@import "@/assets/member/signin.css";
</style>