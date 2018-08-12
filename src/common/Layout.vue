<template>
  <div class="layout-container">
    <Navigation v-on:new="create"></Navigation>
    <slot></slot>
    <NewMailModal v-bind:visible="isNewMailModalVisible" @close="onNewMailModalVisibleChange"></NewMailModal>
  </div>
</template>
<script>
  import Navigation from './Navigation'
  import NewMailModal from './NewMailModal'
  export default {
    components: {
      Navigation,
      NewMailModal
    },
    data() {
      return {
        isNewMailModalVisible: false
      }
    },
    methods: {
      create() {
        this.isNewMailModalVisible = true
      },
      onNewMailModalVisibleChange() {
        this.isNewMailModalVisible = false
      }
    }
  }
</script>