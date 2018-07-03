import NoodleDB from './database'

export const fetchDB = () => {
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

export const updateDB = (uid, data) => {
  let dbInstance = new NoodleDB()
  dbInstance.connect('noodle', 1)
  dbInstance.open('mails').then(db => {
    let transaction = db.transaction(['mails'], "readwrite")
    let store = transaction.objectStore('mails')
    let req = store.openCursor()
    req.onsuccess = function (e) {
      let cursor = e.target.result
      if (cursor) {
        if (cursor.primaryKey === uid) {
          cursor.update({
            uid, data
          })
        }
        cursor.continue()
      }
    }
  })
}

export const login = () => {
  return fetch('http://localhost:3000/imap/login', {
    method: 'POST',
    body: JSON.stringify({
      username: 'tb100200@outlook.com',
      password: 'lming#1oo200',
      host: 'outlook'
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .catch(err => {
      return { error: err }
    })
    .then(res => res.data || res.error)
}

export const fetchList = (uuid) => {
  return fetch('http://localhost:3000/imap/receive/list/all', {
    method: 'POST',
    body: JSON.stringify({
      condition: 'ALL',
      date: (new Date(2017, 11, 12)).toDateString(),
      uuid,
      type: 'INBOX'
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
    .catch(err => {
      return { error: err }
    })
    .then(res => res.data || res.error)
}

export const fetchDetails = (uuid, resultList) => {
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
    .catch(err => {
      return { error: err }
    })
    .then(res => res.data || res.error)
}

export const markSeen = (uuid, uid) => {
  return fetch('http://localhost:3000/imap/mark/flag', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      flag: '\\Seen',
      uuid,
      uid
    })
  })
    .then(res => res.json())
    .catch(err => {
      return { error: err }
    })
    .then(res => res.data || res.error)
}