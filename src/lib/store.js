import Vue from 'vue'
import Vuex from 'vuex'
import { fetchDB, fetchList, fetchDetails, markSeen } from './service'
import { sort, isunseen } from './utils'

Vue.use(Vuex)

const state = {
  accounts: [],
  mails: {
    data: [],
    order: 'desc',
    orderBy: 'attributes.date'
  },
  uuid: null
}

const mutations = {
  fetch(state, payload) {
    state.mails.data = payload.data
    state.uuid = payload.uuid
  },
  markSeen(state, payload) {

  }
}

const actions = {
  markSeen({ state, commit }, value) {
    markSeen(state.uuid, value.attributes.uid).then(() => {
      commit('markSeen', value.uid)
    })
  },
  fetchMailListAsync({ commit }) {
    (async () => {
      try {
        let fetchDBResult = await fetchDB()
        let fetchListResult = await fetchList()
        let list = []
        let mailList = {}
        if (fetchDBResult.result.length > 0) {
          fetchDBResult.result.forEach(f => {
            mailList[f.uid] = f.data
          })
          fetchListResult.result.forEach(f => {
            if (!mailList.hasOwnProperty(f)) {
              list.push(f)
            }
          })
        } else {
          list = fetchListResult.result
        }
        let fetchDetailsResult = await fetchDetails(fetchListResult.uuid, list)
        let transaction = fetchDBResult.db.transaction(['mails'], "readwrite")
        let store = transaction.objectStore('mails')
        for (var r in fetchDetailsResult.result) {
          let o = fetchDetailsResult.result[r]
          mailList[o.attributes.uid] = o
          store.add({
            uid: o.attributes.uid,
            data: o
          })
        }
        commit('fetch', {
          data: sort(Object.values(mailList), 'attributes.date', 'Date').map(t => {
            t.isunseen = isunseen(t)
            return t
          }),
          uuid: fetchListResult.uuid
        })
      } catch (e) {
        console.log(e)
      }
    })()
  }
}

const getters = {
  parse: state => () => {
    return state.mails
  },
  sort: () => sort,
  isunseen: () => isunseen
}

export default new Vuex.Store({
  modules: {
    mailsys: {
      namespaced: true,
      state,
      getters,
      actions,
      mutations
    }
  }
})