import { __STORAGE__ } from "./db";

export default function createAvatar(url, file) {
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