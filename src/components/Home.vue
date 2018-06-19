<template>
  <div class="n-home n-flex">
    <Navigation v-on:inbox="getInbox()"></Navigation>
    <div class="n-overflow-y n-list-cont">
      <ul>
        <li class="mail-item n-flex" v-for="item in mails">
          <div class="n-m-from n-vh-center">{{item.header.from[0].charAt(0)}}</div>
          <div class="n-m-context">
            <div>{{item.header.subject[0]}}</div>
            <div>{{item.header.date[0]}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .n-home {
    height: 100%;
  }
  .n-list-cont {
    padding: 8px;
  }
  .mail-item {
    padding: 8px;
  }
  .n-m-from {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #ccc;
  }
  .n-m-context {
    flex: 1;
    padding: 4px 8px;
  }
</style>

<script>
  import { mapState, mapActions } from 'vuex'
  import base from "../lib/base";
  import Navigation from './Navigation';
  export default {
    computed: mapState({
      mails: state => {
        return state.mailsys.mails
      }
    }),
    methods: mapActions('mailsys', [
      'fetchMailListAsync'
    ]),
    components: {
      Navigation
    },
    mixins: [base],
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      }
    },
    mounted () {
      this.fetchMailListAsync()
    },
    updated() {
      console.log(this)
    },
    beforeUpdate() {
      console.log(this)
    }
  }
</script>
