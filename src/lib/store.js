import Vue from 'vue'
import Vuex from 'vuex'
import { fetchDB, updateDB, fetchList, fetchDetails, markSeen } from './service'
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
    state.mails = { ...payload }
  }
}

const actions = {
  markSeen({ state, commit }, value) {
    (async () => {
      let uid = value.attributes.uid
      let item = state.mails.data.find(f => {
        return f.attributes.uid === uid
      })
      if (item) {
        item.attributes.flags = ['\\Seen']
        updateDB(uid, item)
      }
      commit('markSeen', state.mails)
      await markSeen(state.uuid, uid)
    })()
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
          data: sort(Object.values(mailList), 'attributes.date', 'Date'),
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
  map: () => (data) => {
    return data.map(m => {
      m.isunseen = isunseen(m)
      return m
    })
  }
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