<template>
  <div class="n-home">
    <Navigation v-on:inbox="getInbox()"></Navigation>
  </div>
</template>

<style>
  .n-home {
    height: 100%;
  }
</style>

<script>
  import base from "../lib/base";
  import Navigation from './Navigation';
  export default {
    components: {
      Navigation
    },
    mixins: [base],
    methods: {
      go(event) {
        event.preventDefault();
        this.$router.push(event.currentTarget.dataset.href);
      },
      getInbox() {
        console.log('inbox')
        fetch('http://localhost:3000/imap/receive/all', {
            method: 'POST',
            body: JSON.stringify({
              condition: 'ALL',
              date: (new Date(2017, 11, 12)).toDateString(),
              username: 'tb100200@outlook.com',
              password: 'lming#1oo200',
              host: 'outlook'
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            this.mails = response
          });
      }
    },
    data() {
      return {
        msg: "Welcome to Your Vue.js App",
        mails: {}
      }
    },
    mounted() {
      
    }
  }
</script>
