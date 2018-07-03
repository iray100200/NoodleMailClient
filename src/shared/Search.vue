<style>
  .n-input-cont {
    background: rgba(0, 0, 0, 0.3);
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
</style>
<template>
  <div class="n-input-cont n-v-center">
    <input type="text" />
    <span class="n-flex n-vh-center n-search-icon">
      <Icon type="ios-search-strong"></Icon>
    </span>
  </div>
</template>
<script>
  export default {

  }
</script>