let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let db = null;

export default class NoodleDBClinet {
  connect(name, version) {
    this.connection = indexedDB.open(name, version || 1)
    return this.connection
  }
  install(stores) {
    this.connection.onupgradeneeded = function (event) {
      stores.forEach(f => {
        event.target.result.createObjectStore(f.name, { keyPath: f.keyPath })
      })
    }
  }
  createStore(storeName, keyPath) {
    this.connection.result.createObjectStore(storeName, { keyPath })
  }
  open(storeName) {
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.connection.onsuccess = function (event) {
        db = _this.connection.result
        db.onerror = function (event) {
          console.log("Error creating/accessing IndexedDB database")
        }
        resolve(db)
      }
    })
  }
  add(storeName, value) {
    let transaction = db.transaction([storeName], "readwrite")
    let store = transaction.objectStore(storeName)
  }
}