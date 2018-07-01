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
    .n-html-cont {
      position: relative;
      flex: 1;
       ::-webkit-scrollbar {
        width: 4px;
        background: #eee;
      }
       ::-webkit-scrollbar-thumb {
        background: #808080;
      }
      .n-frame-head {
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
        position: relative;
        z-index: 10;
      }
      .n-subject {
        flex: 1;
        padding: 24px 36px 16px;
        background-color: #f6f5ec;
      }
      .n-c-from {
        padding: 8px 36px 9px;
        color: #ccf;
        background-color: #444693;
      }
      .n-c-from>p {
        margin-top: 2px;
      }
      .n-infos {
        margin-left: 8px;
        font-size: 1.2em;
      }
      .n-tag {
        padding: 0 8px;
        font-size: 0.9em;
        color: #999ddc;
        font-size: 14px;
      }
      .n-frame-container {
        flex: 1;
        position: relative;
      }
      .n-frame-body {
        overflow: auto;
        padding: 28px 36px;
        width: 100%;
        height: 100%;
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
        <li class="mail-item-cont active" v-for="(item, index) in map(mails)" v-bind:class="{ 'selected' : index === selectedIndex }" v-on:click="retrieveHtml(item, index)" v-on:mouseenter="mouseenter($event, index)" v-on:mousemove="mousemove($event, index)"
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
                <p class="n-from-name">{{convertContactListToNames(item.attributes.envelope.from)}}</p>
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
      <NMask v-bind:isLoading="isLoading"></NMask>
      <div class="n-frame-head">
        <div v-if="currentItem">
          <div class="n-align-v">
            <div class="n-subject">
              <h2>{{currentItem.attributes.envelope.subject}}</h2>
            </div>
            <div class="n-c-from" v-if="currentItem">
              <p class="n-flex n-v-center">
                <Avatar icon="person" size="small" />
                <label class="n-infos n-flex-inline">
                      <span class="n-hoverable">{{convertContactListToNames(currentItem.attributes.envelope.from)}}</span>
                      <span class="n-tag">to</span>
                      <span class="n-hoverable">{{convertContactListToNames(currentItem.attributes.envelope.to.slice(0, 2))}}</span>
                      <span class="n-clickable n-v-center">
                        <Poptip trigger="hover" v-bind:content="convertContactListToAddresses(currentItem.attributes.envelope.to)">
                          <Icon class="n-icon" type="ios-more-outline"></Icon>
                        </Poptip>
                      </span>
                    </label>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="n-frame-container n-flex">
        <div class="n-frame-body">
          <iframe v-on:load="frameLoad" width="100%" marginheight="20" frameborder="0" scrolling="no" v-bind:srcdoc="html"></iframe>
        </div>
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
  import NMask from './shared/Mask'
  export default {
    components: {
      Navigation,
      NMask
    },
    computed: {
      ...mapState({
        mails: state => state.mailsys.mails.data,
        status: state => state.mailsys.status,
        isLoading: state => state.mailsys.isLoading,
        hoveredIndex: state => state.mailsys.hoveredIndex,
        selectedIndex: state => state.mailsys.selectedIndex
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
        'markSeen',
        'setFrame',
        'setHoveredIndex',
        'setSelectedIndex'
      ]),
      retrieveHtml(item, index) {
        if (!this.currentItem || item.attributes.uid !== this.currentItem.attributes.uid) {
          this.$Loading.start()
          if (item.body instanceof Array) {
            this.html = item.body.find(f => f.struct.subtype === 'html').text
          } else {
            item.body.text ? this.html = item.body.text : ''
          }
          if (item.isunseen) this.markSeen(item)
          this.currentItem = item
          this.setSelectedIndex(index)
          this.scrollFrame2Top()
        }
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
      frameLoad(e) {
        let obj = e.target
        obj.height = obj.contentDocument.body.scrollHeight + 'px'
        obj.width = obj.contentDocument.body.scrollWidth + 'px'
        this.$Loading.finish()
      },
      scrollFrame2Top() {
        document.querySelector('.n-frame-body').scrollTop = 0
      },
      convertContactListToNames(array) {
        return array.map(m => m.name || m.mailbox).join('; ')
      },
      convertContactListToAddresses(array) {
        return array.map(m => `${m.mailbox}@${m.host}`).join('; ')
      },
      dateNormalize
    },
    mixins: [base],
    data() {
      return {
        html: '',
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
