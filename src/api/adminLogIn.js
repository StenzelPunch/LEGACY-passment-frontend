import { auth, __ROLES__, persistence } from "./db";

function adminLogIn(email, password) {
    return new Promise((resolve, reject) => {
        __ROLES__
            .doc(email)
            .get()
            .then(doc => {
                if (doc.exists) {
                    if (doc.data().role === 1) {
                        auth.setPersistence(persistence).then(res => {
                            return auth
                                .signInWithEmailAndPassword(email, password)
                                .then(user => {
                                    resolve(user.user);
                                })
                                .catch(error => {
                                    reject(new Error(error.message));
                                });
                        }).catch(error => {
                            reject(new Error(error.message));
                        });
                    } else {
                        reject(new Error("Permission denied"));
                    }
                } else {
                    auth.signOut();
                    reject(new Error(`Member <${email}> was not found`));
                }
            });
    });
}

export default adminLogIn;
