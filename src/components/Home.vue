<style>
  .n-home {
    height: 100%;
  }
  .n-list-cont {
    padding: 6px 3px 6px 6px;
    width: 360px;
    background-color: #444693;
  }
  .mail-item {
    padding: 6px 12px;
    border-radius: 4px;
    margin: 5px;
    display: inline-block;
    width: calc(100% - 10px);
    background-image: linear-gradient(90deg, rgba(100, 100, 100, 0.2) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(100, 100, 100, 0.2) 100%);
    background-size: 200% 100%;
    background-position: 100% 0;
    background-color: #444693;
    transition: 0.6s background-color, box-shadow;
    will-change: background;
    color: #eee;
  }
  .mail-item:hover {
    padding: 6px 12px;
    margin: 5px;
    display: inline-block;
    width: calc(100% - 10px);
    background-color: #336;
    color: #fffffb;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
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
  .n-unseen {
    font-weight: 600;
  }
  .n-html-cont {
    flex: 1;
  }
  .n-frame-head {
    height: 84px;
    padding: 30px;
  }
  .n-frame-body {
    flex: 1;
    overflow: auto;
    padding: 30px 0 20px 0;
  }
  .n-avatar {
    margin-right: 4px;
  }
</style>
<template>
  <div class="n-home n-flex">
    <Navigation v-on:inbox="getInbox()"></Navigation>
    <div class="n-overflow-y n-list-cont">
      <ul>
        <li class="mail-item n-flex" 
          v-for="(item, index) in map(mails)"
          v-on:click="retrieveHtml(item)"
          v-on:mousemove="mousemove($event, index)"
          v-on:mouseout="mouseout($event, index)"
          v-bind:style="{ backgroundPositionX: currentSelected === index ? positionX : start }">
          <div class="n-m-from n-flex">
            <div class="n-avator-cont n-v-center">
              <div v-if="item.isunseen">
                <Badge dot>
                  <Avatar shape="square" style="background-color: #87d068" icon="person" />
                </Badge>
              </div>
              <div v-else>
                <Badge>
                  <Avatar shape="square" style="background-color: #87d068" icon="person" />
                </Badge>
              </div>
            </div>
            <div class="n-h-center n-align-v">
              <p class="n-from-name">{{convertFromToNames(item.attributes.envelope.from)}}</p>
              <p class="n-date">{{new Date(item.attributes.date).format('yyyy/MM/dd hh:mm')}}</p>
            </div>
          </div>
          <div class="n-m-context">
            <div v-bind:class="item.isunseen ? 'n-unseen' : 'n-seen'">{{item.attributes.envelope.subject}}</div>
            <div></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="n-html-cont n-overflow-h n-flex n-align-v">
      <div class="n-frame-head">
        <div v-if="currentItem">
          <div class="n-v-center">
            <span class="n-avatar"><Avatar shape="square" style="background-color: #87d068" icon="person" />&nbsp</span>
            <div>
              <h2>{{currentItem.attributes.envelope.subject}}</h2>
            </div>
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
  import { isunseen } from '../lib/utils'
  import { mapState, mapActions, mapGetters } from 'vuex'
  import base from "../lib/base";
  import Navigation from './Navigation';
  export default {
    computed: {
      ...mapState({
        mails: state => state.mailsys.mails.data
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
      }
    },
    components: {
      Navigation
    },
    mixins: [base],
    data() {
      return {
        html: '',
        currentSelected: -1,
        positionX: '100%',
        start: 0,
        currentItem: null
      }
    },
    mounted() {
      this.fetchMailListAsync()
    },
    updated() {
      
    },
    beforeUpdate() {
      
    }
  }
</script>
