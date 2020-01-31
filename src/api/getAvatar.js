import { __STORAGE__ } from "./db";

export default function getAvatar(id) {
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