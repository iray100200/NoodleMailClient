<template>
  <div class="n-home n-flex">
    <Navigation v-on:inbox="getInbox()"></Navigation>
    <div class="n-overflow-y n-list-cont">
      <ul>
        <li class="mail-item n-flex" 
          v-for="(item, index) in mails" 
          v-on:mousemove="mousemove($event, index)"
          v-on:mouseout="mouseout($event, index)"
          v-bind:style="{ backgroundPositionX: currentSelected === index ? positionX : start }">
          <div class="n-m-from n-flex" v-on:click="retrieveHtml(item)">
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
    <div class="n-html-cont n-overflow-h">
      <iframe width="100%" height="100%" frameborder="0" scrolling="auto" v-bind:srcdoc="html"></iframe>
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
    background-image: linear-gradient(90deg, rgba(80, 96, 96, 0.3) 0%, rgba(0, 0, 0, 0) 50%, rgba(80, 96, 96, 0.3) 100%);
    background-size: 200% 100%;
    background-position: 100% 0;
    background-color: #f6f6f8;
    transition: 0.3s background-color;
    will-change: background;
  }
  .mail-item:hover {
    padding: 6px 12px;
    margin: 5px;
    display: inline-block;
    width: calc(100% - 10px);
    background-color: #f6f5ec;
  }
  .n-m-from {
    height: 44px;
    border-radius: 50%;
  }
  .n-from-name {
    color: #130c0e;
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
    color: #999d9c;
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
</style>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import base from "../lib/base";
  import Navigation from './Navigation';
  export default {
    computed: {
      ...mapState({
        mails: state => {
          return state.mailsys.mails.data
        }
      }),
      ...mapGetters({
        parse: 'mailsys/parse',
        sort: 'mailsys/sort',
        isunseen: 'mailsys/isunseen'
      })
    },
    methods: {
      ...mapActions('mailsys', [
        'fetchMailListAsync'
      ]),
      retrieveHtml(item) {
        item.body.text ? this.html = item.body.text : ''
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
        start: 0
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
