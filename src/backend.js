import * as firebase from "firebase";
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
                params.notFound('/404')
            }
        })
        .catch(error => {
            console.warn("Error load user");
            console.error(error);
        });
}

export default backend;

export { db, storage, loadData};
