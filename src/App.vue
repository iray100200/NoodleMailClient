<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: "App"
	};
</script>

<style lang="css">
	html, body {
		height: 100%;
		margin: 0;
	}
	li {
		list-style: none;
	}
	.n-flex {
		display: flex;
	}
	.n-vh-center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.n-overflow {
		overflow: scroll;
	}
	.n-overflow-x {
		overflow-x: scroll;
	}
	.n-overflow-y {
		overflow-y: scroll;
	}
</style>