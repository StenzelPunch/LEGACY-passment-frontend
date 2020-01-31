import { __MEMBERS__ } from "./db";

export default function loadMembers() {
    return new Promise((resolve, reject) => {
        __MEMBERS__
            .get()
            .then(res => {
                const data = res.docs.filter(doc => {
                    return doc.id !== "--stats--" ? true : false;
                });
                resolve(
                    data.map(doc => {
                        return doc.data();
                    })
                );
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}