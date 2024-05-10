<script setup>
defineProps({ article: Object });
</script>

<template>
    <tr class="text-center">
								<th scope="row">{{article.articleNo}}</th>
								<td class="text-start"><RouterLink :to="{name: 'article-view', params : {  articleNo : article.articleNo}}"
									class="article-title link-dark"
									style="text-decoration: none"> {{article.subject}} </RouterLink></td>
								<td>{{article.userId}}</td>
								<td>{{article.hit}}</td>
								<td>{{article.memoCnt}}</td>
								<td>{{article.registerTime}}</td>
	</tr>
</template>

<style scoped>

</style>