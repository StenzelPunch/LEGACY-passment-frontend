import { __MEMBERS__ } from "./db";

export default function updateMember(params) {
    return new Promise((resolve, reject) => {
        __MEMBERS__
            .doc(params.url)
            .update(params)
            .then(res => {
                resolve(res);
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}