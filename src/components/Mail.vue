<style lang="scss">
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
</style>
<template>
  <div class="n-html-cont n-overflow-h n-flex n-align-v">
    <div class="n-frame-head">
      <div v-if="current">
        <div class="n-align-v">
          <div class="n-subject">
            <h2>{{current.attributes.envelope.subject}}</h2>
          </div>
          <div class="n-c-from">
            <p class="n-flex n-v-center">
              <Avatar icon="person" size="small" />
              <label class="n-infos n-flex-inline">
                <span class="n-hoverable">{{convertContactsToNames(current.attributes.envelope.from)}}</span>
                <span class="n-tag">to</span>
                <span class="n-hoverable">{{convertContactsToNames(current.attributes.envelope.to.slice(0, 2))}}</span>
                <span class="n-clickable n-v-center">
                  <Poptip trigger="hover" v-bind:content="convertContactsToAddresses(current.attributes.envelope.to)">
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
      <div class="n-frame-body" ref="frameBody">
        <iframe v-on:load="frameLoad" width="100%" marginheight="20" frameborder="0" scrolling="no" v-bind:srcdoc="html(current)"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
  import { isunseen } from '../lib/utils'
  import {
    mapState,
    mapGetters,
    mapActions
  } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        convertContactsToNames: 'mailsys/convertContactsToNames',
        convertContactsToAddresses: 'mailsys/convertContactsToAddresses'
      }),
      ...mapState({
        current: state => state.mailsys.current
      })
    },
    watch: {
      current(to, from) {
        if (to) this.begin()
      }
    },
    methods: {
      ...mapActions('mailsys', [
        'markSeen'
      ]),
      html() {
        if (this.current) {
          let body = this.current.body
          if (body instanceof Array) {
            return body.find(f => f.struct.subtype === 'html').text
          }
          return body.text || ''
        }
        return ''
      },
      begin() {
        this.$Loading.start()
        if (this.$refs.frameBody) this.$refs.frameBody.scrollTop = 0
        if (isunseen(this.current)) this.markSeen(this.current)
      },
      frameLoad(e) {
        let obj = e.target
        obj.height = obj.contentDocument.body.scrollHeight + 'px'
        obj.width = obj.contentDocument.body.scrollWidth + 'px'
        this.$Loading.finish()
      }
    }
  }
</script>