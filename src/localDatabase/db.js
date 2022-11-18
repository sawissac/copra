import { openDB,deleteDB } from '../../node_modules/idb/build/index.js';

export async function createCopraDB() {
  const db = await openDB("copra", 1, {
    upgrade(db, oldVersion, newVersion, transaction) {

      switch (oldVersion) {
        case 0:
          upgradeToV1();
        default:
          console.log("unknown version");
      }

      function upgradeToV1() {
        db.createObjectStore("page");
        db.createObjectStore("image");
        transaction
          .objectStore("page")
          .add([], "data");
        transaction.objectStore("image").add("", "data");
      }

    },
  });
  db.close();
}

export function getCopraPageData(){
  return new Promise(async (resolve)=>{
    const db = await openDB("copra",1);
    let transaction = db.transaction('page', 'readwrite');
    let pageData = await transaction.objectStore('page').get('data');
    resolve(pageData);
    db.close();
  })
}
export function getCopraImageData(){
  return new Promise(async (resolve)=>{
    const db = await openDB("copra",1);
    let transaction = db.transaction('image', 'readwrite');
    let pageData = await transaction.objectStore('image').get('data');
    resolve(pageData);
    db.close();
  })
}
export function updateCopraPageData(data){
  return new Promise(async (resolve)=>{
    const db = await openDB("copra",1);
    const transaction = db.transaction('page', 'readwrite');
    await transaction.objectStore('page').put(data,'data');
    resolve("success");
    db.close();
  })
}
export function updateCopraImageData(data){
  return new Promise(async (resolve)=>{
    const db = await openDB("copra",1);
    const transaction = db.transaction('image', 'readwrite');
    await transaction.objectStore('image').put(data,'data');
    resolve("success");
    db.close();
  })
}

