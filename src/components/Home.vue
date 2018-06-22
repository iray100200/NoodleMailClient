<template>
  <div class="n-home n-flex">
    <Navigation v-on:inbox="getInbox()"></Navigation>
    <div class="n-overflow-y n-list-cont">
      <ul>
        <li class="mail-item n-flex" v-for="item in mails">
          <div class="n-m-from n-flex">
            <div class="n-avator-cont n-v-center">
              <Avatar shape="square" style="background-color: #87d068" icon="person" />
            </div>
            <div class="n-h-center n-align-v">
              <p>{{item.header.from[0].split(' ')[0]}}</p>
              <p class="n-date">{{new Date(item.header.date[0]).format('yyyy/MM/dd hh:mm')}}</p>
            </div>
          </div>
          <div class="n-m-context">
            <div>{{item.header.subject[0]}}</div>
            <div></div>
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
    width: 360px;
  }
  .mail-item {
    padding: 6px 12px;
    margin: 5px;
    display: inline-block;
    width: calc(100% - 10px);
    background-color: #efeff2;
  }
  .n-m-from {
    height: 44px;
    border-radius: 50%;
  }
  .n-m-context {
    flex: 1;
    padding: 4px 0;
    font-size: 1.06em;
    font-weight: 600;
  }
  .n-avator-cont {
    width: 44px;
  }
  .n-date {
    font-size: 12px;
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
