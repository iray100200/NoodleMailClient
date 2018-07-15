<style>
  .n-markup-input {
    padding: 2px 16px;
    font-size: 12px;
    height: 32px;
    color: #464547;
    margin: 0;
    box-sizing: content-box;
    border-bottom: 1px solid #eee;
  }

  .n-markup-input .n-label {
    min-width: 40px;
    height: 100%;
    text-align: justify;
    line-height: 32px;
    margin-right: 12px;
    font-size: 13px;
    font-weight: bold;
  }

  .n-markup-input .n-label i {
    display: inline-block;
    width: 100%;
  }

  .n-markup-input .n-input-container {
    flex: 1;
    height: 100%;
    border-radius: 2px;
  }

  .n-markup-input .n-input-container .n-input {
    border: 0;
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 0 0 0 8px;
    font-size: 12px;
    color: #464547;
  }
</style>
<template>
  <div class="n-markup-input n-v-center">
    <div class="n-label">{{label}}<i></i></div>
    <div class="n-input-container n-v-center">
      <input class="n-input" v-bind:placeholder="placeholder" v-bind:value="value" type="text" v-bind:disabled="disabled" />
    </div>
  </div>
</template>
<script>
  export default {
    props: ['label', 'placeholder', 'value', 'disabled']
  }
</script>