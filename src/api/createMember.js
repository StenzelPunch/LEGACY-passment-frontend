import { __MEMBERS__, __COUNT__, __INCREMENT__, __BATCH__ } from "./db";

export default function createMember(params) {
    return new Promise((resolve, reject) => {
        getCount().then(id => {
            __MEMBERS__
                .doc(params.url)
                .set({
                    id,
                    ...params
                })
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    reject(new Error(error.message));
                });
        });
    });
}

function getCount() {
    return new Promise((resolve, reject) => {
        incrementCount().then(() => {
            __COUNT__.get().then(res => {
                resolve(res.data().id);
            });
        });
    });
}

function incrementCount() {
    return new Promise((resolve, reject) => {
        __BATCH__.set(__COUNT__, { id: __INCREMENT__ }, { merge: true });
        __BATCH__.commit().then(() => {
            resolve(true);
        });
    });
}
