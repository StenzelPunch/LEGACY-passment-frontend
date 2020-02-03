import { auth, persistence } from './db'

function signOut(email, password) {
    return new Promise((resolve, reject) => {
        auth
            .setPersistence(persistence)
            .then(res => {
                return auth
                    .signOut()
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(new Error(error.message));
                    });
            })
            .catch(error => {
                reject(new Error(error.message));
            });
    });
}

export default signOut;
