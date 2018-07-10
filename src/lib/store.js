import Vue from 'vue'
import Vuex from 'vuex'
import MailStore from './stores/mail.store'
import NavStore from './stores/nav.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mailsys: MailStore,
    navsys: NavStore
  }
})