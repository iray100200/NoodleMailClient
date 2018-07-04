<template>
  <div class="n-navigation">
    <div class="n-logo-cont n-vh-center">
      <Icon type="ios-drag" size="24"></Icon>
    </div>
    <div class="n-nav-cont">
      <ul>
        <router-link title="关联账户" tag="li" to="/mail/inbox">
          <span class="n-icon n-vh-center">
            <Icon type="ios-person-outline" size="25"></Icon>
          </span>
        </router-link>
        <router-link title="新邮件" tag="li" to="/mail/inbox">
          <span class="n-icon n-vh-center">
            <Icon type="ios-plus-outline" size="24"></Icon>
          </span>
        </router-link>
        <router-link title="收件箱" tag="li" to="/mail/inbox">
          <span class="n-icon n-vh-center">
            <Icon type="ios-email-outline" size="24"></Icon>
          </span>
        </router-link>
        <router-link title="已发送" tag="li" to="/mail/sent">
          <span class="n-icon n-vh-center">
            <Icon type="ios-redo-outline" size="24"></Icon>
          </span>
        </router-link>
        <router-link title="展开更多" tag="li" to="/mail/inbox">
          <span class="n-icon n-vh-center">
            <Icon type="ios-more-outline" size="24"></Icon>
          </span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<style>
.n-navigation {
  width: 48px;
  height: 100%;
  background: #333582;
}
.n-logo-cont {
  height: 48px;
  color: white;
}
.n-logo-cont:hover {
  background: rgba(222, 222, 222, 0.25);
}
.n-nav-cont ul {
  margin: 0;
  padding: 0;
}
.n-nav-cont ul li {
  height: 48px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff0ee;
  cursor: pointer;
}
.n-nav-cont ul li:hover {
  background: rgba(200, 200, 200, 0.15);
  color: orange;
}
.n-icon {
  width: 100%;
  height: 100%;
}
</style>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      inbox() {
        this.$emit('inbox')
      }
    }
  }
</script>