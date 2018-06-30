import Vue from 'vue'
import Vuex from 'vuex'
import { fetchDB, updateDB, login, fetchList, fetchDetails, markSeen } from './service'
import { sort, isunseen } from './utils'
import { stat } from 'fs';

Vue.use(Vuex)

const state = {
  accounts: [],
  mails: {
    data: [],
    order: 'desc',
    orderBy: 'attributes.date'
  },
  uuid: null,
  status: {},
  notification: {
    opened: false
  }
}

const mutations = {
  fetch(state, payload) {
    state.mails.data = payload.data
    state.uuid = payload.uuid
    state.status = payload.status
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
    function commitFetch(uuid) {
      return (list, statusCode) => {
        return commit('fetch', {
          data: sort(list, 'attributes.date', 'Date'),
          uuid: uuid || null,
          status: {
            code: statusCode
          }
        })
      }
    }
    (async () => {
      try {
        let fetchDBResult = await fetchDB()
        let loginResult = await login()
        let addlist = [], removeList = [], mailList = []
        if (loginResult.error) {
          mailList = fetchDBResult.result.map(m => m.data)
          return commitFetch()(mailList, 'error')
        }
        let commitFetchLoginResult = commitFetch(loginResult.uuid)
        let fetchListResult = await fetchList(loginResult.uuid)
        if (fetchDBResult.result && fetchDBResult.result.length > 0) {
          fetchDBResult.result.forEach(f => {
            if (!fetchListResult.result.some(s => {
              return s === f.uid
            })) {
              removeList.push(f.uid)
            } else {
              mailList.push(f.data)
            }
          })
          fetchListResult.result.forEach(f => {
            if (!fetchDBResult.result.some(s => {
              return s.uid === f
            })) {
              addlist.push(f)
            }
          })
        } else {
          addlist = fetchListResult.result
        }
        let fetchDetailsResult = await fetchDetails(loginResult.uuid, addlist)
        let transaction = fetchDBResult.db.transaction(['mails'], "readwrite")
        let store = transaction.objectStore('mails')
        for (var r in fetchDetailsResult.result) {
          let o = fetchDetailsResult.result[r]
          mailList.push(o)
          store.add({
            uid: o.attributes.uid,
            data: o
          })
        }
        removeList.forEach(a => store.delete(a))
        commitFetchLoginResult(mailList, 'success')
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
      if (!!m) m.isunseen = isunseen(m)
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