import { auth } from "./db"

const checkUser = () => {
    return new Promise ((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            user ? resolve(user) : reject(new Error('User does not exist'))
        })
    })
}

export default checkUser

