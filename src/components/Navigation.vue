<template>
  <div class="n-navigation">
    <div class="n-logo-cont n-vh-center" @click="expandOrNot">
      <Icon type="ios-drag" size="24"></Icon>
    </div>
    <div class="n-nav-cont">
      <ul>
        <router-link title="关联账户" tag="li" to="/mail/inbox">
          <span class="n-icon n-vh-center">
              <Icon type="ios-person-outline" size="25"></Icon>
            </span>
        </router-link>
        <li title="新邮件" @click="createNew">
          <span class="n-icon n-vh-center">
              <Icon type="ios-plus-outline" size="24"></Icon>
            </span>
        </li>
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
<script>
  import '../scss/nav.scss'
  export default {
    data() {
      return {}
    },
    methods: {
      createNew() {
        this.$emit('new')
      },
      expandOrNot() {
      }
    }
  }
</script>