import { __MEMBERS__ } from "./db";

export default function getMember(id) {
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
                reject(new Error(error));
            });
    });
}
