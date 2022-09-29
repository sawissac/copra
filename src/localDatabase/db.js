async function createCopraDB() {
  const db = await idb.openDB("copra", 1, {
    upgrade(db, oldVersion, newVersion, transation) {
      switch (oldVersion) {
        case 0:
          upgradeToV1();
        default:
          console.log("unknow version");
      }

      function upgradeToV1() {
        db.createObjectStore("page");
        db.createObjectStore("image");
        transation
          .objectStore("page")
          .add([], "data");
        transation.objectStore("image").add("", "data");
      }
    },
  });
  db.close();
}

function getCopraPageData(){
  return new Promise(async (resolve)=>{
    const db = await idb.openDB("copra",1);
    let transaction = db.transaction('page', 'readwrite');
    let pageData = await transaction.objectStore('page').get('data');
    resolve(pageData);
    db.close();
  })
}
function getCopraImageData(){
  return new Promise(async (resolve)=>{
    const db = await idb.openDB("copra",1);
    let transaction = db.transaction('image', 'readwrite');
    let pageData = await transaction.objectStore('image').get('data');
    resolve(pageData);
    db.close();
  })
}
function updateCopraPageData(data){
  return new Promise(async (resolve)=>{
    const db = await idb.openDB("copra",1);
    const transaction = db.transaction('page', 'readwrite');
    await transaction.objectStore('page').put(data,'data');
    resolve("success");
    db.close();
  })
}
function updateCopraImageData(data){
  return new Promise(async (resolve)=>{
    const db = await idb.openDB("copra",1);
    const transaction = db.transaction('image', 'readwrite');
    await transaction.objectStore('image').put(data,'data');
    resolve("success");
    db.close();
  })
}

