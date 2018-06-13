<template>
  <div class="n-navigation">
    <div class="n-logo-cont">

    </div>
    <div class="n-nav-cont">
      <ul>
        <li><i class="material-icons" v-on:click="create()">create</i></li>
        <li><i class="material-icons" v-on:click="inbox()">email</i></li>
        <li><i class="material-icons" v-on:click="outbox()">send</i></li>
        <li><i class="material-icons" v-on:click="drafts()">border_color</i></li>
      </ul>
    </div>
  </div>
</template>
<style>
.n-navigation {
  width: 48px;
  height: 100%;
  background: #003a6c;
}
.n-logo-cont {
  height: 48px;
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