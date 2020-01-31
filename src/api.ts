import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import config from "./local/config";

const backend = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const __DB__ = backend.firestore();
const __STORAGE__ = backend.storage();
const __MEMBERS__ = __DB__.collection("members");
const batch = __DB__.batch();
const count = __MEMBERS__.doc("--stats--");
const increment = firebase.firestore.FieldValue.increment(1);

interface Member {
    url: string;
    id: number;
    uid?: string;
    first_name: string;
    last_name: string;
    patronymic: string;
    user_email: string;
    user_phone: string;
    bio?: string;
    info: string;

    links: Links;
}

interface Link {
    name: string;
    value: string;
}

interface Links extends Array<Link> {}

interface LinksNames extends Array<string> {}

const linksNames: LinksNames = [
    "phone",
    "email",
    "website",
    "telegram",
    "viber",
    "whatsapp",
    "messenger",
    "facebook",
    "linkedin",
    "instagram",
    "twitter",
    "youtube",
    "skype",
    "vimeo",
    "gmaps"
];

function getMember(id: string) {
    return new Promise((resolve, reject) => {
        __MEMBERS__
            .doc(id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    resolve(doc.data());
                } else {
                    reject(new Error(`Member with id: '${id}' was not found`));
                }
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}

function getAvatar(id: string) {
    return new Promise((resolve, reject) => {
        __STORAGE__
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

function createMember(member: Member, file: File) {
    return new Promise((resolve, reject) => {
        getCount().then(id => {
            __MEMBERS__
                .doc(member.url)
                .set({
                    ...member,
                    id
                })
                .then(res => {
                    if (file) {
                        createAvatar(member.url, file);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(new Error(error.message));
                });
        });
    });
}

// function loadMembers() {
//     return new Promise((resolve, reject) => {
//         members
//             .get()
//             .then(res => {
//                 const data = res.docs.filter(doc => {
//                     return doc.id !== "--stats--" ? true : false;
//                 });
//                 resolve(
//                     data.map(doc => {
//                         return doc.data();
//                     })
//                 );
//             })
//             .catch(error => {
//                 reject(new Error(error.message));
//             });
//     });
// }

function createAvatar(url: string, file: File) {
    return new Promise((resolve, reject) => {
        __STORAGE__
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

// function deleteMember(url) {
//     return new Promise((resolve, reject) => {
//         members
//             .doc(url)
//             .delete()
//             .then(() => {
//                 console.log("Document successfully deleted!");
//                 resolve(true);
//             })
//             .catch(error => {
//                 console.log("delete error");
//                 console.error("Error removing document: ", error);
//             });
//     });
// }

function getCount() {
    return new Promise((resolve, reject) => {
        incrementCount().then(() => {
            count.get().then(res => {
                resolve(res.data()!.id);
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

// function updateMember(params) {
//     const info = prepareInfo(params.info);
//     const links = prepareLinks(params.links);
//     const file = params.file;

//     return new Promise((resolve, reject) => {
//         members
//             .doc(info.url)
//             .update({
//                 ...info,
//                 links: links
//             })
//             .then(res => {
//                 if (file) {
//                     createAvatar(info.url, file);
//                 }
//                 resolve(res);
//             })
//             .catch(error => {
//                 reject(new Error(error.message));
//             });
//     });
// }

export default backend;

// export { getMember, createMember, loadMembers, deleteMember, updateMember };
export { getMember, getAvatar, linksNames };
