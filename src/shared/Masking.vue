<style>
.n-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(166, 168, 168, 0.4);
  -webkit-filter: blur(1px);
  filter: blur(1px);
}
</style>
<template>
  <div class="n-mask n-v-center n-h-center" v-if="isLoading">
    <Spin size="large"></Spin>
  </div>
</template>
<script>
export default {
  props: ["isLoading"]
};
</script>