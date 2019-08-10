import { installDB, fetchDB, updateDB, auth, fetchList, fetchDetails, markSeen } from '../service'
import { sort, isunseen } from '../utils'
import { MAIL } from '../constants'

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
  current: null
}

const mutations = {
  fetch(state, payload) {
    let { target, data, uuid, status } = payload
    state.mails[target.toLowerCase()].data = data
    state.uuid = uuid
    state.status = status
  },
  markSeen(state, payload) {
    state.mails.inbox = { ...payload }
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
      let { data, target } = value
      let uid = data.attributes.uid
      let item = state.mails[target.toLowerCase()].data.find(f => {
        return f.attributes.uid === uid
      })
      if (item) {
        item.attributes.flags = [MAIL.SEEN]
        updateDB(target, uid, item)
      }
      commit('markSeen', state.mails.inbox)
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
    async function checkAuth() {
      const loginResult = await auth()
      if (loginResult instanceof Error || loginResult.error || loginResult.errorno || !loginResult.uuid) {
        return
      }
      return loginResult.uuid
    }
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
    async function fetch() {
      let { target, currentPage = 1 } = value
      const authId = await checkAuth()
      if (!authId) {
        return
      }
      const fetchDBResult = await fetchDB(target)
      commitFetch(target)(fetchDBResult.result.map(m => m.data), 'success')
      const commitFetchLoginResult = commitFetch(target, authId)
      const fetchListResult = await fetchList(authId, target)
      const dolist = fetchListResult && fetchListResult.result.slice((currentPage - 1) * 20, currentPage * 20)
      const existing = fetchDBResult.result
      let addlist = [], mailList = existing.map(o => o.data)
      if (existing && existing.length > 0) {
        dolist.forEach(f => {
          if (!existing.some(s => {
            return s.uid === f
          })) {
            addlist.push(f)
          }
        })
      } else {
        addlist = addlist.concat(dolist)
      }
      addlist = addlist.slice(0, 20) //get the first 20 items
      if (addlist.length === 0) {
        return
      }
      let fetchDetailsResult = await fetchDetails(authId, addlist)
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
      commitFetchLoginResult(mailList, 'success')
    }
    try {
      return fetch()
    } catch (e) {
      console.error(e)
      return fetch()
    }
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

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}