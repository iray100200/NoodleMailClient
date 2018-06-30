<style lang="scss">
  .n-home {
    height: 100%;
    .n-list-cont {
      padding: 4px 3px 6px 6px;
      width: 360px;
      background-color: #444693;
    }
    .mail-item-cont {
      &.active {
        &:hover {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        .mail-item:hover {
          background-color: #337;
          color: #fffffb;
        }
      }
      margin: 8px 4px;
      display: block;
      border-radius: 4px;
      overflow: hidden;
      .mail-item {
        padding: 6px 12px;
        background-color: #444693;
        transition: 0.6s background-color, box-shadow;
        will-change: background;
        color: #eee;
      }
      .mail-head-date {
        margin-left: 4px;
      }
      .mail-head {
        color: #afb4db;
        padding: 0 12px;
        background-color: #585eaa;
        height: 30px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        position: relative;
        background-image: linear-gradient(90deg, rgba(100, 100, 100, 0.2) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(100, 100, 100, 0.2) 100%);
        background-size: 200% 100%;
        background-position: 100% 0;
      }
      .mail-item-bg {
        background-image: linear-gradient(90deg, rgba(100, 100, 100, 0.2) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(100, 100, 100, 0.2) 100%);
        background-size: 200% 100%;
        background-position: 100% 0;
      }
      .n-loading {
        background-size: 340px 100px;
        background-image: url(../assets/images/mail-loding.svg);
        background-repeat: no-repeat;
      }
      .mail-temp {
        height: 80px;
        width: 340px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.08);
        opacity: 0.8;
      }
    }
    .n-m-from {
      height: 44px;
      border-radius: 50%;
    }
    .n-from-name {
      color: inherit;
    }
    .n-m-context {
      flex: 1;
      padding: 4px 0;
      font-size: 1.06em;
    }
    .n-avator-cont {
      width: 44px;
    }
    .n-date {
      font-size: 12px;
      color: #999c9c;
    }
    .n-seen {
      font-weight: 400;
    }
    .n-unseen .n-from-name {
      font-weight: 600;
      color: #7bbfea;
    }
    .n-unseen .n-date {
      color: #7bbfea;
    }
    .n-unseen .n-m-context {
      font-weight: bold;
    }
    .n-html-cont {
      flex: 1;
      ::-webkit-scrollbar {
        width: 4px;
        background: #eee;
      }
      ::-webkit-scrollbar-thumb {
        background: #808080;
        border-radius: 2px;
      }
      .n-frame-head {
        padding: 30px 30px 20px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 10;
      }
      .n-frame-body {
        flex: 1;
        overflow: auto;
        padding: 30px 0 20px 0;
      }
      .n-subject {
        flex: 1;
      }
      .n-c-from {
        margin-top: 10px;
      }
      .n-c-from>label {
        margin-left: 6px;
      }
    }
  }
</style>
<template>
  <div class="n-home n-flex">
    <Navigation v-on:inbox="getInbox()"></Navigation>
    <div class="n-overflow-y n-list-cont" v-bind:class="{ 'n-overflow-h': !mails.length }">
      <ul>
        <li class="mail-item-cont" v-for="item in mailTemps" v-if="!mails.length">
          <div class="mail-item mail-temp n-loading"></div>
        </li>
        <li class="mail-item-cont active" v-for="(item, index) in map(mails)" v-on:click="retrieveHtml(item)" v-on:mousemove="mousemove($event, index)" v-on:mouseout="mouseout($event, index)">
          <div v-if="!!item && item.isunseen" class="mail-head n-flex n-v-center" v-bind:style="{ backgroundPositionX: currentSelected === index ? positionX : start }">
            <Icon type="ios-clock-outline" size="14.5"></Icon>
            <label class="mail-head-date">{{dateNormalize(item.attributes.envelope.date)}}</label>
          </div>
          <div class="mail-item mail-item-bg" v-bind:class="[item.isunseen ? 'n-unseen' : 'n-seen']" v-bind:style="{ backgroundPositionX: currentSelected === index ? positionX : start }">
            <div class="n-m-from n-flex" v-if="!!item">
              <div class="n-avator-cont n-v-center">
                <Badge dot v-bind:count="item.isunseen ? 1 : 0">
                  <Avatar shape="square" style="background-color: #87d068" icon="person" />
                </Badge>
              </div>
              <div class="n-h-center n-align-v">
                <p class="n-from-name">{{convertFromToNames(item.attributes.envelope.from)}}</p>
                <p class="n-date">{{new Date(item.attributes.date).format('yyyy/MM/dd hh:mm')}}</p>
              </div>
            </div>
            <div class="n-m-context" v-if="!!item">
              <div>{{item.attributes.envelope.subject}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="n-html-cont n-overflow-h n-flex n-align-v">
      <div class="n-frame-head">
        <div v-if="currentItem">
          <div class="n-align-v">
            <div class="n-subject">
              <h2>{{currentItem.attributes.envelope.subject}}</h2>
            </div>
            <span class="n-c-from n-flex n-v-center">
                    <Avatar shape="square" style="background-color: #87d068" icon="person" />
                    <label>{{convertFromToNames(currentItem.attributes.envelope.from)}}</label>
                  </span>
          </div>
        </div>
      </div>
      <div class="n-frame-body">
        <iframe onload="resizeHeight(this)" width="100%" marginheight="20" frameborder="0" scrolling="auto" v-bind:srcdoc="html"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    isunseen,
    dateNormalize
  } from '../lib/utils'
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex'
  import base from "../lib/base";
  import Navigation from './Navigation'
  export default {
    components: {
      Navigation
    },
    computed: {
      ...mapState({
        mails: state => state.mailsys.mails.data,
        status: state => state.mailsys.status
      }),
      ...mapGetters({
        parse: 'mailsys/parse',
        sort: 'mailsys/sort',
        map: 'mailsys/map'
      })
    },
    methods: {
      ...mapActions('mailsys', [
        'fetchMailListAsync',
        'markSeen'
      ]),
      retrieveHtml(item) {
        item.body.text ? this.html = item.body.text : ''
        if (item.isunseen) this.markSeen(item)
        this.currentItem = item
      },
      mousemove(e, index) {
        this.currentSelected = index
        let w = e.currentTarget.offsetWidth
        this.positionX = ((w - e.offsetX) / w * 100) + '%'
      },
      mouseout(e, index) {
        this.currentSelected = -1
      },
      convertFromToNames(array) {
        return array.map(m => m.name).join(', ')
      },
      dateNormalize
    },
    mixins: [base],
    data() {
      return {
        html: '',
        currentSelected: -1,
        positionX: '100%',
        start: 0,
        currentItem: null,
        mailTemps: Array.apply(this, {
          length: parseInt(document.documentElement.clientHeight / 80)
        })
      }
    },
    mounted() {
      this.fetchMailListAsync()
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'mailsys/fetch' && state.mailsys.status.code === 'error') {
          this.$Notice.error({
            title: '状态提醒',
            desc: '连接服务器失败，请稍后重新尝试！'
          })
        }
      })
    },
    updated() {},
    beforeUpdate() {}
  }
</script>
