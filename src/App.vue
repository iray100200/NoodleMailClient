<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: "App",
		mounted() {
			this.$Loading.config({
				color: '#009ad6',
				failedColor: '#f0ad4e',
				height: 2
			})
		}
	}
</script>