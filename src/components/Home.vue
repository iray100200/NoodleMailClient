<style lang="scss">
  .n-home {
    height: 100%;
    ::-webkit-scrollbar {
      width: 2px;
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #9b95c9;
    }
    .n-list-cont {
      width: 360px;
      background-color: #444693;
      position: relative;
      .n-ul {
        padding: 52px 6px 4px 4px;
        overflow-y: scroll;
        flex: 1;
        direction: rtl;
        > * {
          direction: ltr;
          text-align: left;
        }
      }
      .n-filter-cont {
        position: absolute;
        top: 0;
        z-index: 1000;
        background: #444694;
        direction: rtl;
        padding: 12px 8px 8px;
        left: 2px;
        right: 0;
      }
      .n-filter {
        overflow-y: scroll;
        direction: ltr;
      }
      .n-more {
        color: #afb4db;
        font-size: 20px;
        padding: 0px 0;
        margin-left: 4px;
        width: 32px;
        height: 32px;
      }
    }
    .loading-bar {
      height: 28px;
      margin: 0!important;
    }
    .mail-item-cont {
      position: relative;
      &:first-child {
        margin-top: 0;
      }
      &.active:not(.selected) {
        &:hover {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        .n-date {
          font-size: 12px;
          color: #b1b3b6;
        }
        .mail-item:hover {
          background-color: rgba(0, 0, 70, 0.3);
          color: #fffffb;
          not(.n-unseen) .n-date {
            color: #d3d7d4;
          }
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
      }
      &.selected {
        .mail-item {
          background-color: #afb4db;
          color: #130c0e;
          background-position: 0!important;
        }
        .n-date {
          color: #3e4145;
        }
      }
      margin: 8px 4px;
      display: block;
      border-radius: 4px;
      overflow: hidden;
      .mail-item {
        text-align: left;
        padding: 6px 12px;
        background-color: #444693;
        transition: 0.6s background-color, box-shadow;
        will-change: background;
        color: #fcfcff;
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
      }
      .mail-item-bg {
        background-image: linear-gradient(90deg, rgba(180, 180, 180, 0.1) 0%, rgba(255, 255, 255, 0.15) 25%, rgba(255, 255, 255, 0.24) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(180, 180, 180, 0.1) 100%);
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
    .n-r-view {
      position: relative;
      flex: 1;
      min-width: 525px;
      > *:first-child {
        height: 100%;
      }
    }
  }
  .n-create-modal {
    .n-title {
      font-size: 1.12em;
      color: #444693;
    }
  }
  .fade-enter-active {
    animation-name: fade-in;
    animation-duration: .3s;
    animation-timing-function: ease-out;
  }
  .fade-leave-active {
    animation-name: fade-out;
    animation-duration: .2s;
    animation-timing-function: ease-in;
  }
  @keyframes fade-in {
    from {
      height: 0;
    }
    to {
      height: 30px;
    }
  }
  @keyframes fade-out {
    from {
      height: 30px;
    }
    to {
      height: 0;
    }
  }
  .loader {
    width: 28px;
    height: 28px;
    position: relative;
  }
  .circular {
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto
  }
  .path {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite,color 6s ease-in-out infinite;
    stroke-linecap: round
  }
  @keyframes color {
    0%, to {
      stroke: #d62d20
    }
    40% {
      stroke: #0057e7
    }
    66% {
      stroke: #008744
    }
    80%,90% {
      stroke: #ffa700
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0
    }
    50% {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -35
    }
    to {
      stroke-dasharray: 89,200;
      stroke-dashoffset: -124
    }
  }
  @keyframes rotate {
    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn)
    }
  }
</style>
<template>
  <div class="n-home n-flex">
    <Navigation v-on:new="create"></Navigation>
    <div class="n-overflow-y n-list-cont n-flex n-align-v">
      <div class="n-filter-cont">
        <div class="n-filter n-flex">
          <span style="flex: 1">
            <Filtering v-on:refresh="refresh" />
          </span>
        </div>
      </div>
      <ul class="n-ul" v-bind:class="{ 'n-overflow-h': !mails.length }">
        <transition name="fade">
          <li class="loading-bar n-vh-center" v-if="mails.length > 0 && isLoading">
            <Spin>
              <div class="loader">
                <svg class="circular" viewBox="25 25 50 50">
                  <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                </svg>
              </div>
            </Spin>
          </li>
        </transition>
        <li class="mail-item-cont" v-for="item in mailTemps" v-if="!mails.length">
          <div class="mail-item mail-temp n-loading"></div>
        </li>
        <li class="mail-item-cont active" 
          v-for="(item, index) in mails" 
          v-bind:class="{ 'selected' : encodeId(item.attributes.uid) === currentId }" 
          v-on:click="route(item)" 
          v-on:mouseenter="mouseenter($event, index)" 
          v-on:mousemove="mousemove($event, index)"
          v-on:mouseleave="mouseleave($event, index)">
          <div class="mail-head mail-item-bg n-flex n-v-center" v-if="!!item && item.isunseen" v-bind:style="{ backgroundPositionX: hoveredIndex === index ? positionX : start }">
            <Icon type="ios-clock-outline" size="14.5"></Icon>
            <label class="mail-head-date">{{dateNormalize(item.attributes.envelope.date)}}</label>
          </div>
          <div class="mail-item mail-item-bg" v-bind:class="[item.isunseen ? 'n-unseen' : 'n-seen']" v-bind:style="{ backgroundPositionX: hoveredIndex === index ? positionX : start }">
            <div class="n-m-from n-flex" v-if="!!item">
              <div class="n-avator-cont n-v-center">
                <Badge dot v-bind:count="item.isunseen ? 1 : 0">
                  <Avatar shape="square" style="background-color: #87d068" icon="person" />
                </Badge>
              </div>
              <div class="n-h-center n-align-v">
                <p class="n-from-name">{{convertContactsToNames(item.attributes.envelope.from)}}</p>
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
    <div class="n-r-view">
      <router-view></router-view>
    </div>
    <Modal v-model="create_modal" width="80%" :styles="{ top: '6.4vh' }">
      <p slot="header" class="n-center n-create-modal">
        <label class="n-title">新邮件</label>
      </p>
      <New />
      <div slot="footer">
        <Button type="error" size="large" @click="del">Delete</Button>
      </div>
    </Modal>
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
  import Filtering from '../shared/Filter'
  import New from './New'
  export default {
    components: {
      Navigation,
      Filtering,
      New
    },
    computed: {
      ...mapState({
        status: state => state.mailsys.status,
        hoveredIndex: state => state.mailsys.hoveredIndex,
        selectedIndex: state => state.mailsys.selectedIndex,
        isLoading: state => state.mailsys.isLoading
      }),
      ...mapGetters({
        parse: 'mailsys/parse',
        sort: 'mailsys/sort',
        get: 'mailsys/get',
        convertContactsToNames: 'mailsys/convertContactsToNames'
      })
    },
    methods: {
      ...mapActions('mailsys', [
        'fetchMailListAsync',
        'setFrame',
        'setHoveredIndex',
        'setSelectedIndex',
        'setCurrent'
      ]),
      route(item) {
        this.$router.push({ path: `/mail/${this.targetName}/${this.encodeId(item.attributes.uid)}` })
      },
      mouseenter(e, index) {
        this.setHoveredIndex(index)
      },
      mouseleave(e, index) {
        this.setHoveredIndex(-1)
      },
      mousemove(e, index) {
        let w = e.currentTarget.offsetWidth
        this.positionX = ((w - e.layerX) / w * 100) + '%'
      },
      find(uid) {
        return this.mails.length > 0 ? this.mails.find(f => {
          return f.attributes.uid === this.decodeId(uid)
        }) : null
      },
      encodeId(id) {
        return Number(id).toString('36') || null
      },
      decodeId(id) {
        return parseInt(String(id), '36') || null
      },
      create() {
        this.create_modal = true
      },
      del() {

      },
      refresh() {
        this.fetchMailListAsync({ target: this.targetName, showState: true })
      },
      dateNormalize
    },
    mixins: [base],
    data() {
      return {
        html: '',
        positionX: '100%',
        start: 0,
        currentId: null,
        targetName: null,
        mails: [],
        mailTemps: Array.apply(this, {
          length: Math.floor((document.documentElement.clientHeight - 60) / 80)
        }).map(() => 0),
        create_modal: false
      }
    },
    mounted() {
      this.$store.subscribe(function (mutation, state) {
        if (mutation.type === 'mailsys/fetch' && state.mailsys.status.code === 'error') {
          this.$Notice.error({
            title: '状态提醒',
            desc: '连接服务器失败，请稍后重新尝试！'
          })
        }
        if (mutation.type === 'mailsys/fetch') {
          this.mails = this.get(this.targetName)
          let current = this.find(this.currentId)
          /* Load the current at the first loading time */
          /* Then, Has a better way? */
          if (current) this.setCurrent(current)
        }
      }.bind(this))
    },
    watch: {
      $route(to) {
        this.currentId = to.params.id
        let current = this.find(this.currentId)
        let target = to.params.target
        /* If routes change, load the current */
        /* Then, Has a better way? */
        if (current) this.setCurrent(current)
        if ((this.targetName !== target)) {
          this.targetName = target
          this.fetchMailListAsync({ target, showState: true })
        }
      }
    },
    created() {
      let { id, target } = this.$route.params
      this.currentId = id
      this.targetName = target
      this.fetchMailListAsync({ target, showState: true })
    },
    updated() {},
    beforeUpdate() {}
  }
</script>
