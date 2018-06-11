<template>
	<div class="sun-layout-root">
		<div class="sun-layout-header">
			<div class="top-header">
				<div class="top-header__left"></div>
				<div class="top-header__title">首页</div>
				<div class="top-header__right"></div>
			</div>
		</div>
		<div class="sun-layout-body">
			<div class="sun-panel">
				<div class="sun-panel__body">
					<div class="banner"><img src="../assets/images/img_banner.png" alt=""></div>
					<ul class="list-home">
						<li v-on:click="go" data-href="/schedule" class="list-home__item"><img src="../assets/images/icon_home_1.svg" alt="">排班</li>
						<li v-on:click="go" data-href="/warning" class="list-home__item"><img src="../assets/images/icon_home_2.svg" alt="">预警</li>
						<li v-on:click="go" data-href="/balance" class="list-home__item"><img src="../assets/images/icon_home_3.svg" alt="">余额</li>
						<li v-on:click="go" data-href="/manage/expense" class="list-home__item"><img src="../assets/images/icon_home_4.svg" alt="">费用管理</li>
						<li v-on:click="go" data-href="/ranking" class="list-home__item"><img src="../assets/images/icon_home_5.svg" alt="">排名</li>
						<li v-on:click="go" data-href="/analyse" class="list-home__item"><img src="../assets/images/icon_home_6.svg" alt="">数据分析</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import base from "../lib/base";
export default {
  mixins: [base],
  methods: {
    go(event) {
      event.preventDefault();
      this.$router.push(event.currentTarget.dataset.href);
    }
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    }
  }
}
</script>
