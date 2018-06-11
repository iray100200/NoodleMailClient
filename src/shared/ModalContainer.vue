<template>
    <keep-alive>
        <component v-if="modal_opened" v-bind:is="modal" v-on:close="closeModal"></component>
    </keep-alive>
</template>

<script>
export default {
  props: ['modal', 'state'],
  methods: {
    closeModal() {
      this.modal_opened = false
      this.$parent.state = false
    }
  },
  data() {
      return {
        modal_opened: this.$props.state
      }
  },
  watch: {
    state(newvalue) {
      if (newvalue !== this.modal_opened) {
        this.modal_opened = newvalue
      }
    }
  }
};
</script>