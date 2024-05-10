<script setup>

</script>

<template>
   <main class="form-signin w-100 m-auto">
		<form id="form" method="post" action="/member.do/signup">
			<img class="mb-4" src="@/assets/img/2.png" alt="" width="120"
				height="100" />
			<h1 class="h3 mb-3 fw-normal">회원가입</h1>
			<div class="mt-2 form-floating">
				<input type="text" class="form-control" id="name" name="userid"
					placeholder="" /> <label for="name">이름</label>
			</div>
			<div class="mt-2 form-floating">
				<input type="text" class="form-control" id="id" name="username"
					placeholder="" /> <label for="id">아이디</label>
			</div>
			<div class="mt-2 form-floating">
				<input type="password" class="form-control" id="pw"
					name="userpassword" placeholder="" /> <label for="pw">비밀번호</label>
			</div>
			<div class="mt-2 form-floating">
				<input type="password" class="form-control" id="checkPw"
					placeholder="" /> <label for="checkPw">비밀번호 확인</label>
			</div>
			<div style="display: flex;">
				<div class="mt-2 form-floating col-5">
					<input type="email" class="form-control" id="email" name="emailid"
						placeholder="" /> <label for="email">이메일</label>
				</div>
				<p style="padding: 1rem; margin-top:0.5rem;">@</p>
				<div class="mt-2 form-floating col-6" style="display: flex;">
					<input type="email" class="form-control" id="email2"
						name="emaildomain" placeholder="" /> <label for="email2">이메일
						주소</label>
				</div>
			</div>

			<br />
			<button id="primary-button" class="btn btn-primary w-100 py-2"
				type="button" onclick="javascript:signUp();">회원가입</button>
		</form>
	</main>
</template>

<style scoped>
@import "@/assets/main/main.css";
@import "@/assets/member/signup.css";
</style>