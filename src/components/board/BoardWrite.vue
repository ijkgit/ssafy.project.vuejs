<script setup>
import BoardFormItemVue from "./item/BoardFormItem.vue";
</script>

<template>
    <div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-8 col-md-10 col-sm-12">
				<h2 class="my-3 py-3 shadow-sm bg-light text-center">글쓰기</h2>
			</div>
            <BoardFormItemVue :type="'write'"/>
		</div>
	</div>
</template>

<style scoped>

</style>