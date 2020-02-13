import { __ORDERS__, __EMAILCOUNT__, __INCREMENT__, __BATCH__ } from "./db";

export default function sendEmail(params) {
    return new Promise((resolve, reject) => {
        getCount().then(id => {
            __ORDERS__
                .doc()
                .set({
                    number: id,
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
            __EMAILCOUNT__.get().then(res => {
                resolve(res.data().id);
            });
        });
    });
}

function incrementCount() {
    return new Promise((resolve, reject) => {
        __BATCH__.set(__EMAILCOUNT__, { id: __INCREMENT__ }, { merge: true });
        __BATCH__.commit().then(() => {
            resolve(true);
        });
    });
}
