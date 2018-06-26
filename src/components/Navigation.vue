<template>
  <div class="n-navigation">
    <div class="n-logo-cont n-vh-center">
      <Icon type="ios-drag" size="24"></Icon>
    </div>
    <div class="n-nav-cont">
      <ul>
        <li><Icon type="ios-person-outline" size="25"></Icon></li>
        <li><Icon type="ios-plus-outline" size="24"></Icon></li>
        <li><Icon type="ios-email-outline" size="24"></Icon></li>
        <li><Icon type="ios-loop" size="22"></Icon></li>
        <li><Icon type="ios-more-outline" size="24"></Icon></li>
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