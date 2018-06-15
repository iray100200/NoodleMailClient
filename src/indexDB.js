window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
let indexDBRequest = indexedDB.open('noodle', 1)
indexDBRequest.onupgradeneeded = function (event) {
  console.log("Upgrading");
  db = event.target.result;
  var objectStore = db.createObjectStore("mails", { keyPath: "rollNo" });
};
indexDBRequest.onsuccess = function (event) {
  db = indexDBRequest.result
  db.onerror = function (event) {
    console.log("Error creating/accessing IndexedDB database")
  }
  if (db.setVersion) {
    if (db.version != dbVersion) {
      var setVersion = db.setVersion(dbVersion);
      setVersion.onsuccess = function () {
        createObjectStore(db);
      };
    }
  }
  let transaction = db.transaction(["mails"], "readwrite");
  transaction.oncomplete = function (event) {
    console.log("Transaction Mails Success");
  };
  transaction.onerror = function (event) {
    console.log("Error");
  };
  let objectStore = transaction.objectStore("mails");
  objectStore.add({ rollNo: 1 });
}
