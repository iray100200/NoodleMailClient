import Vue from 'vue'
import Vuex from 'vuex'
import { installDB, fetchDB, updateDB, login, fetchList, fetchDetails, markSeen } from './service'
import { sort, isunseen } from './utils'

Vue.use(Vuex)

installDB([
  {
    name: 'inbox',
    keyPath: 'uid'
  },
  {
    name: 'sent',
    keyPath: 'uid'
  }
])

const state = {
  accounts: [],
  mails: {
    inbox: {
      data: [],
      order: 'desc',
      orderBy: 'attributes.date'
    },
    sent: {
      data: [],
      order: 'desc',
      orderBy: 'attributes.date'
    },
    drafts: {
      data: [],
      order: 'desc',
      orderBy: 'attributes.date'
    }
  },
  hoveredIndex: -1,
  selectedIndex: -1,
  uuid: null,
  status: {},
  isLoading: false,
  current: null
}

const mutations = {
  fetch(state, payload) {
    let { target, data, uuid, status } = payload
    state.mails[target.toLowerCase()].data = data
    state.uuid = uuid
    state.status = status
  },
  loading(state, payload) {
    state.isLoading = payload
  },
  markSeen(state, payload) {
    state.mails = { ...payload }
  },
  setFrame(state, payload) {
    state.isLoading = payload.isLoading
  },
  setHoveredIndex(state, payload) {
    console.log(payload)
    state.hoveredIndex = payload
  },
  setSelectedIndex(state, payload) {
    state.selectedIndex = payload
  },
  setCurrent(state, payload) {
    state.current = { ...payload }
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
  setFrame({ commit }, value) {
    commit('setFrame', value)
  },
  setHoveredIndex({ commit }, value) {
    commit('setHoveredIndex', value)
  },
  setSelectedIndex({ commit }, value) {
    commit('setSelectedIndex', value)
  },
  setCurrent({ commit }, value) {
    commit('setCurrent', value)
  },
  fetchMailListAsync({ commit }, value) {
    function commitFetch(target, uuid) {
      return (list, statusCode) => {
        return commit('fetch', {
          target,
          data: sort(list, 'attributes.date', 'Date'),
          uuid: uuid || null,
          status: {
            code: statusCode
          }
        })
      }
    }
    (async () => {
      let { target, showState } = value
      try {
        let fetchDBResult = await fetchDB(target), temp
        commitFetch(target)(temp = fetchDBResult.result.map(m => m.data), 'success')
        if (showState) commit('loading', true)
        let loginResult = await login()
        let addlist = [], removeList = [], mailList = []
        if (loginResult instanceof Error || loginResult.error) {
          mailList = temp
          if (showState) commit('loading', false)
          return commitFetch(target)(mailList, 'error')
        }
        let commitFetchLoginResult = commitFetch(target, loginResult.uuid)
        let fetchListResult = await fetchList(loginResult.uuid, target)
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
        let transaction = fetchDBResult.db.transaction([target], "readwrite")
        let store = transaction.objectStore(target)
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
        if (showState) commit('loading', false)
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
  get: (state) => (target) => {
    return state.mails[target.toLowerCase()].data.map(m => {
      if (!!m) m.isunseen = isunseen(m)
      return m
    })
  },
  convertContactsToNames: () => (array) => {
    return array.map(m => m.name || m.mailbox).join('; ')
  },
  convertContactsToAddresses: () => (array) => {
    return array.map(m => `${m.mailbox}@${m.host}`).join('; ')
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