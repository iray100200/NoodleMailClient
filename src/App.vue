<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: "App"
	};
</script>

<style lang="css">
	* {
		box-sizing: border-box;
	}
	html, body {
		height: 100%;
		margin: 0;
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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
	.n-v-center {
		display: flex;
		align-items: center;
	}
	.n-h-center {
		display: flex;
		justify-content: center;
	}
	.n-align-h {
		flex-direction: row;
	}
	.n-align-v {
		flex-direction: column;
	}
	.n-overflow {
		overflow: auto;
	}
	.n-overflow-x {
		overflow-x: auto;
	}
	.n-overflow-y {
		overflow-y: auto;
	}
	.n-overflow-h {
		overflow: hidden;
	}
</style>