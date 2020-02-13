import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import config from "../local/config";

const backend = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const db = backend.firestore();
const auth = backend.auth();
const persistence = firebase.auth.Auth.Persistence.LOCAL
const __BATCH__ = db.batch();
const __STORAGE__ = backend.storage();
const __MEMBERS__ = backend.firestore().collection("members");
const __ORDERS__ = backend.firestore().collection("orders");
const __ROLES__ = backend.firestore().collection("roles");
const __COUNT__ = __MEMBERS__.doc("--stats--");
const __EMAILCOUNT__ = __ORDERS__.doc("--stats--");
const __INCREMENT__ = firebase.firestore.FieldValue.increment(1);
      
export { backend };
export { db };
export { auth };
export { __BATCH__ };
export { __STORAGE__ };
export { __MEMBERS__ };
export { __COUNT__ };
export { __INCREMENT__ };
export { persistence };
export { __ROLES__ };
export { __ORDERS__ };
export { __EMAILCOUNT__ };
