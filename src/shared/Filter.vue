<style>
  .n-input-cont {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    height: 30px;
  }
  input {
    flex: 1;
    height: 100%;
    border: 0;
    background: transparent;
    outline: none;
    padding: 0 10px;
    color: #afb4db;
    font-size: 1.1em;
  }
  .n-search-icon {
    font-size: 20px;
    width: 24px;
    height: 24px;
    color: #afb4db;
    margin-right: 6px;
  }
  .n-filter-icon {
    font-size: 18px;
    height: 24px;
    color: #afb4db;
    width: 36px;
    height: 100%;
    border-right: 1px groove #494e8f;
  }
</style>
<template>
  <div class="n-input-cont n-v-center">
    <span class="n-flex n-vh-center n-filter-icon n-link" @click="setting">
      <Icon type="ios-settings-strong"></Icon>
    </span>
    <span class="n-flex n-vh-center n-filter-icon n-link" @click="refresh">
      <Icon type="ios-loop-strong"></Icon>
    </span>
    <input type="text" placeholder="搜索" />
    <span class="n-flex n-vh-center n-search-icon n-link" @click="search">
      <Icon type="ios-search-strong"></Icon>
    </span>
  </div>
</template>
<script>
  export default {
    methods: {
      setting() {
        this.$emit('setting')
      },
      refresh() {
        this.$emit('refresh')
      },
      search() {
        this.$emit('search')
      }
    }
  }
</script>