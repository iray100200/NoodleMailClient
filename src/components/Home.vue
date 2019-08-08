<style>
.fade-enter-active {
  animation-name: fade-in;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
}
.fade-leave-active {
  animation-name: fade-out;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
}
@keyframes fade-in {
  from {
    height: 0;
    padding-bottom: 0;
  }
  to {
    height: 36px;
    padding-bottom: 8px;
  }
}
@keyframes fade-out {
  from {
    height: 36px;
    padding-bottom: 8px;
  }
  to {
    height: 0;
    padding-bottom: 0;
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
  margin: auto;
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}
@keyframes color {
  0%,
  to {
    stroke: #d62d20;
  }
  40% {
    stroke: #0057e7;
  }
  66% {
    stroke: #008744;
  }
  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  to {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes rotate {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
<template>
  <Layout class="n-home n-flex">
    <div class="n-overflow-y n-list-cont n-flex n-align-v">
      <div class="n-filter-cont">
        <div class="n-filter n-flex">
          <span style="flex: 1">
            <Filtering v-on:refresh="refresh" />
          </span>
        </div>
      </div>
      <div class="n-ul-cont">
        <vue-scroll>
          <ul class="n-ul" v-bind:class="{ 'n-overflow-h': !mails.length }">
            <transition name="fade">
              <li class="loading-bar n-vh-center" v-if="mails.length > 0 && isLoading">
                <Spin>
                  <div class="loader">
                    <svg class="circular" viewBox="25 25 50 50">
                      <circle
                        class="path"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke-width="5"
                        stroke-miterlimit="10"
                      />
                    </svg>
                  </div>
                </Spin>
              </li>
            </transition>
            <li class="mail-item-cont" v-for="item in mailTemps" v-if="!mails.length">
              <div class="mail-item mail-temp n-loading"></div>
            </li>
            <li
              class="mail-item-cont active"
              v-for="(item, index) in mails"
              v-bind:class="{ 'selected' : encodeId(item.attributes.uid) === currentId }"
              v-on:click="route(item)"
              v-on:mouseenter="mouseenter($event, index)"
              v-on:mousemove="mousemove($event, index)"
              v-on:mouseleave="mouseleave($event, index)"
            >
              <div
                class="mail-head mail-item-bg n-flex n-v-center"
                v-if="!!item && item.isunseen"
                v-bind:style="{ backgroundPositionX: hoveredIndex === index ? positionX : start }"
              >
                <Icon type="ios-clock-outline" size="14.5"></Icon>
                <label class="mail-head-date">{{dateNormalize(item.attributes.envelope.date)}}</label>
              </div>
              <div
                class="mail-item mail-item-bg"
                v-bind:class="[item.isunseen ? 'n-unseen' : 'n-seen']"
                v-bind:style="{ backgroundPositionX: hoveredIndex === index ? positionX : start }"
              >
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
        </vue-scroll>
      </div>
    </div>
    <div class="n-r-view">
      <router-view></router-view>
    </div>
  </Layout>
</template>

<script>
import "../scss/home.scss";
import { isunseen, dateNormalize } from "../lib/utils";
import { mapState, mapActions, mapGetters } from "vuex";
import base from "../lib/base";
import Layout from "../common/Layout";
import Filtering from "../shared/Filter";
export default {
  components: {
    Layout,
    Filtering
  },
  computed: {
    ...mapState({
      status: state => state.mailsys.status,
      hoveredIndex: state => state.mailsys.hoveredIndex,
      selectedIndex: state => state.mailsys.selectedIndex,
      isLoading: state => state.mailsys.isLoading
    }),
    ...mapGetters({
      parse: "mailsys/parse",
      sort: "mailsys/sort",
      get: "mailsys/get",
      convertContactsToNames: "mailsys/convertContactsToNames"
    })
  },
  methods: {
    ...mapActions("mailsys", [
      "fetchMailListAsync",
      "setFrame",
      "setHoveredIndex",
      "setSelectedIndex",
      "setCurrent"
    ]),
    route(item) {
      this.$router.push({
        path: `/mail/${this.targetName}/${this.encodeId(item.attributes.uid)}`
      });
    },
    mouseenter(e, index) {
      this.setHoveredIndex(index);
    },
    mouseleave(e, index) {
      this.setHoveredIndex(-1);
    },
    mousemove(e, index) {
      let w = e.currentTarget.offsetWidth;
      this.positionX = ((w - e.layerX) / w) * 100 + "%";
    },
    find(uid) {
      return this.mails.length > 0
        ? this.mails.find(f => {
            return f.attributes.uid === this.decodeId(uid);
          })
        : null;
    },
    encodeId(id) {
      return Number(id).toString("36") || null;
    },
    decodeId(id) {
      return parseInt(String(id), "36") || null;
    },
    refresh() {
      this.fetchMailListAsync({
        target: this.targetName,
        showState: true
      });
    },
    dateNormalize
  },
  mixins: [base],
  data() {
    return {
      html: "",
      positionX: "100%",
      start: 0,
      currentId: null,
      targetName: null,
      mails: [],
      mailTemps: Array.apply(this, {
        length: Math.floor((document.documentElement.clientHeight - 60) / 80)
      }).map(() => 0)
    };
  },
  mounted() {
    this.$store.subscribe(
      function(mutation, state) {
        console.log(mutation.type);
        if (
          mutation.type === "mailsys/fetch" &&
          state.mailsys.status.code === "error"
        ) {
          this.$Notice.error({
            title: "状态提醒",
            desc: "连接服务器失败，请稍后重新尝试！"
          });
        }
        if (mutation.type === "mailsys/fetch") {
          this.mails = this.get(this.targetName);
          let current = this.find(this.currentId);
          /* Load the current at the first loading time */
          /* Then, Has a better way? */
          if (current) this.setCurrent(current);
        }
        if (mutation.type === "mailsys/markSeen") {
          this.mails = this.get(this.targetName);
        }
      }.bind(this)
    );
  },
  watch: {
    $route(to) {
      this.currentId = to.params.id;
      let current = this.find(this.currentId);
      let target = to.params.target;
      /* If routes change, load the current */
      /* Then, Has a better way? */
      if (current) this.setCurrent(current);
      if (target && this.targetName !== target) {
        this.targetName = target;
        this.fetchMailListAsync({
          target,
          showState: true
        });
      }
    }
  },
  created() {
    let { id, target = 'inbox' } = this.$route.params;
    this.currentId = id;
    this.targetName = target;
    this.fetchMailListAsync({
      target,
      showState: true
    });
  },
  updated() {},
  beforeUpdate() {}
};
</script>
