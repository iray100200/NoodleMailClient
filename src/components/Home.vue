<style lang="scss">
  .n-home {
    height: 100%;
    .n-list-cont {
      padding: 4px 3px 6px 6px;
      width: 360px;
      background-color: #444693;
    }
    .mail-item-cont {
      position: relative;
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
        <li class="mail-item-cont active" 
          v-for="(item, index) in map(mails)" 
          v-bind:class="{ 'selected' : item.attributes.uid === currentId }" 
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
    <router-view></router-view>
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
        status: state => state.mailsys.status,
        hoveredIndex: state => state.mailsys.hoveredIndex,
        selectedIndex: state => state.mailsys.selectedIndex
      }),
      ...mapGetters({
        parse: 'mailsys/parse',
        sort: 'mailsys/sort',
        map: 'mailsys/map',
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
        this.$router.push({ path: `/mail/${this.encodeId(item.attributes.uid)}` })
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
        console.log(w, e.layerX, this.positionX)
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
      dateNormalize
    },
    mixins: [base],
    data() {
      return {
        html: '',
        positionX: '100%',
        start: 0,
        currentId: null,
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
        if (mutation.type === 'mailsys/fetch' && state.mailsys.mails.data.length > 0) {
          let current = this.find(this.currentId)
          /* Load the current at the first loading time */
          /* Then, Has a better way? */
          if (current) this.setCurrent(current)
        }
      })
    },
    watch: {
      $route(to) {
        this.currentId = to.params.id
        let current = this.find(this.currentId)
        /* If routes change, load the current */
        /* Then, Has a better way? */
        if (current) this.setCurrent(current)
      }
    },
    created() {
      this.currentId = this.decodeId(this.$route.params.id)
    },
    updated() {},
    beforeUpdate() {}
  }
</script>
