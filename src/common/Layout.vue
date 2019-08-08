<template>
  <div class="layout-container">
    <Navigation></Navigation>
    <slot></slot>
  </div>
</template>
<script>
  import Navigation from './Navigation'
  export default {
    components: {
      Navigation
    },
    data() {
      return {}
    },
    methods: {
      
    }
  }
</script>