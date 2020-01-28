import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import config from "./local/config";

const backend = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = backend.firestore();
const batch = db.batch();
const storage = backend.storage();
const members = backend.firestore().collection("members");
const count = members.doc("--stats--");
const increment = firebase.firestore.FieldValue.increment(1);

function getMember(id) {
    return new Promise((resolve, reject) => {
        members
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    getAvatar(id)
                        .then(url => {
                            resolve([doc.data(), url]);
                        })
                        .catch(err => {
                            resolve([doc.data(), null]);
                        });
                } else {
                    reject(new Error(`Member with id: '${id}' was not found`));
                }
            })
            .catch(error => {
                reject(new Error(error));
            });
    });
}

function getAvatar(id) {
    return new Promise((resolve, reject) => {
        storage
            .refFromURL(`gs://passment-be.appspot.com/avatars/${id}.png`)
            .getDownloadURL()
            .then(url => {
                resolve(url);
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}

function createMember(params) {
    return new Promise((resolve, reject) => {
        getCount().then(id => {
            members
                .doc(params.info.url)
                .set({
                    id,
                    ...params.info,
                    links: {
                        ...params.links
                    }
                })
                .then(res => {
                    if (params.file) {
                        createAvatar(params.info.url, params.file);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(new Error(error.message));
                });
        });
    });
}

function loadMembers() {
    return new Promise((resolve, reject) => {
        members
            .get()
            .then(res => {
                const data = res.docs.filter(doc => {
                    return doc.id !== "--stats--" ? true : false;
                });
                resolve(
                    data.map(doc => {
                        return doc.data();
                    })
                );
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}

function createAvatar(url, file) {
    return new Promise((resolve, reject) => {
        storage
            .refFromURL("gs://passment-be.appspot.com/avatars/" + url + ".png")
            .put(file)
            .then(msg => {
                resolve(msg);
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}

function deleteMember(url) {
    return new Promise((resolve, reject) => {
        members
            .doc(url)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
                resolve(true);
            })
            .catch(error => {
                console.log("delete error");
                console.error("Error removing document: ", error);
            });
    });
}

function getCount() {
    return new Promise((resolve, reject) => {
        incrementCount().then(() => {
            count.get().then(res => {
                resolve(res.data().id);
            });
        });
    });
}

function incrementCount() {
    return new Promise((resolve, reject) => {
        batch.set(count, { id: increment }, { merge: true });
        batch.commit().then(() => {
            resolve(true);
        });
    });
}

function updateMember(params) {
    return new Promise((resolve, reject) => {
        members
            .doc(params.info.url)
            .set({
                ...params.info,
                links: {
                    ...params.links
                }
            })
            .then(res => {
                if (params.file) {
                    createAvatar(params.info.url, params.file);
                }
                resolve(res);
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}

export default backend;

export { getMember, createMember, loadMembers, deleteMember, updateMember };
