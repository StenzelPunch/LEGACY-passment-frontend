import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import config from "../local/config";

const backend = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = backend.firestore();
export const __BATCH__ = db.batch();
export const __STORAGE__ = backend.storage();
export const __MEMBERS__ = backend.firestore().collection("members");
export const __COUNT__ = __MEMBERS__.doc("--stats--");
export const __INCREMENT__ = firebase.firestore.FieldValue.increment(1);


