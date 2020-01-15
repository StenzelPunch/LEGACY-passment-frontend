import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import config from "./local/config";

const backend = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = backend.firestore();
const storage = backend.storage();

function loadData(params) {
    db.collection("members")
        .doc(params.id)
        .get()
        .then(doc => {
            try {
                if (doc.exists) {
                    params.setUser(doc.data());
                    if (true) {
                        try {
                            storage
                                .refFromURL(`gs://passment-be.appspot.com/avatars/${params.id}.png`)
                                .getDownloadURL()
                                .then(url => {
                                    params.setAvatarUrl(url);
                                })
                                .catch(err => {
                                    console.warn("Error load avatar");
                                    console.error(err);
                                });
                        } catch {
                            console.log("Can't load image");
                        }
                    }
                } else {
                    throw new Error("No such document!");
                }
            } catch (error) {
                console.log(error);
                params.notFound("/404");
            }
        })
        .catch(error => {
            console.warn("Error load user");
            console.error(error);
        });
}

function loadMembers(callback) {
    try {
        db.collection("members")
            .get()
            .then(res => {
                callback(
                    res.docs.map(doc => {
                        return doc.data();
                    })
                );
            })
            .catch(error => {
                throw new Error(error);
            });
    } catch (error) {
        throw new Error(error);
    }
}

function createMember(info, links, file) {
    return new Promise((resolve, reject) => {
        db.collection("members")
            .doc(info.url)
            .set({
                ...info,
                links: {
                    ...links
                }
            })
            .then(function(res) {
                if (file) {
                    storage
                        .refFromURL("gs://passment-be.appspot.com/avatars/" + info.url + ".png")
                        .put(file)
                        .then(msg => {
                            alert("success");
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                }
                resolve(res);
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                reject(error);
            });
    });
}

export default backend;

export { db, storage, loadData, loadMembers, createMember };
