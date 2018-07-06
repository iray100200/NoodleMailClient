let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let db = null;

export default class NoodleDBClinet {
  db = null
  _promise = null
  connect(name, version) {
    this.connection = indexedDB.open(name, version || 1)
    return this.connection
  }
  createStore(storeName, keyPath) {
    this.connection.result.createObjectStore(storeName, { keyPath })
  }
  subscribe(callback) {
    if (callback) this._promise.then(callback)
  }
  install(stores) {
    let _this = this
    function promise() {
      return new Promise(resolve => {
        _this.connection.onupgradeneeded = function (event) {
          let result = event.target.result
          stores.forEach(s => {
            result.createObjectStore(s.name, { keyPath: s.keyPath })
          })
        }
        _this.connection.onsuccess = function () {
          _this.db = _this.connection.result
          _this.db.onerror = function (event) {
            console.log("Error creating/accessing IndexedDB database")
          }
          _this.db.onsuccess = function (event) {
            console.log(event)
          }
          resolve(_this.db)
        }
      })
    }
    this._promise = promise()
    return this
  }
  add(storeName) {
    let transaction = db.transaction([storeName], "readwrite")
    let store = transaction.objectStore(storeName)
  }
}