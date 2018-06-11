<template>
  <div v-html="rawHtml">
  </div>
</template>

<script>
  import base from "../lib/base";
  export default {
    mixins: [base],
    methods: {
      go(event) {
        event.preventDefault();
        this.$router.push(event.currentTarget.dataset.href);
      }
    },
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        rawHtml: ''
      }
    },
    mounted() {
      var _this = this;
      fetch('http://localhost:3000/imap/receive/all/4?username=tb100200@outlook.com&host=outlook&password=lming%231oo200').then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          _this.rawHtml = response.data['570'].body[1].text
        });
    }
  }
</script>
