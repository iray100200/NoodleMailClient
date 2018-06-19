import Vue from 'vue'
import Vuex from 'vuex'
import NoodleDB from './database'

Vue.use(Vuex)

const state = {
  accounts: [],
  mails: {}
}

const fetchDB = () => {
  return new Promise((resolve) => {
    let dbInstance = new NoodleDB()
    dbInstance.connect('noodle', 1)
    dbInstance.install([{ name: 'mails', keyPath: 'uid' }])
    dbInstance.open('mails').then(db => {
      let transaction = db.transaction(['mails'], "readonly")
      let store = transaction.objectStore('mails')
      store.getAll().onsuccess = function (e) {
        resolve({ result: e.target.result, db })
      }
    })
  })
}

const fetchList = () => {
  return fetch('http://localhost:3000/imap/receive/list/all', {
    method: 'POST',
    body: JSON.stringify({
      condition: 'ALL',
      date: (new Date(2017, 11, 12)).toDateString(),
      username: 'tb100200@outlook.com',
      password: 'lming#1oo200',
      host: 'outlook'
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .then(res => res.data)
}

const fetchDetails = (uuid, resultList) => {
  return fetch('http://localhost:3000/imap/receive/details', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      list: resultList,
      uuid
    })
  })
    .then(res => res.json())
    .then(res => res.data)
}

const mutations = {
  fetch(state, payload) {
    state.mails = payload.data
  }
}

const actions = {
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
          data: mailList
        })
      } catch (e) {
        console.log(e)
      }
    })()
  }
}

const getters = {}

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