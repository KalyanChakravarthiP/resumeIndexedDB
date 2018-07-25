function fetchJson(file){
	return new Promise((resolve,reject)=>{
		return fetch(file).then(response=>{
			if(response.ok){
				resolve(response.json());
			} else {
				reject(new Error('error'));
			}
		})
	})
}

// var storeDb;
var data;
var fetchedData=fetchJson("database/data.json");
fetchedData.then(data=>{
	console.log(data);
	products(data);
})


function products(d){

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var open = indexedDB.open("MyDatabase", 1);

open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    // var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    // var index = store.index("NameIndex");

    for(var i=0; i<d.length; i++){

    store.put({id: d[i].id, data:{category:d[i].category, name :d[i].name, price:d[i].price, image: d[i].image, description:d[i].description}});
    // store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
    }
    // Query the data
    var getJohn = store.get(8);
    // var getBob = index.get(["Smith", "Bob"]);

    getJohn.onsuccess = function() {
    console.log(getJohn.result.data.category);  // => "John"
    };

    // getBob.onsuccess = function() {
    //     console.log(getBob.result.name.first);   // => "Bob"
    // };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}

}
// var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
//   window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
//     READ_WRITE: "readwrite"
// };

// var idb=window.indexedDB.open("myDb",1);

// idb.onupgradeneeded=function(e){
// var dbHandler=e.target.result;
// storeDB = dbHandler.createObjectStore("products", {keyPath:"productName"});
// console.log("upgraded successfully");
// }

// idb.onerror=function(e){
// 	console.log("error"+e);
// }

// idb.onsuccess=function(e){
// 	var dbHandler=e.target.result;
// 	transaction=dbHandler.transaction(['products'], 'readwrite'),
// 	storeDb=transaction.objectStore('products');
// 	storeDB.get(4).onsuccess = function(e) {
//       console.log(e.target.result);
//     };
//     storeDb.put({

// 	});
// 	};

	