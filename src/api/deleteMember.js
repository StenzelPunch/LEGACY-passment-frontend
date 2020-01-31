import { __MEMBERS__ } from "./db";

export default function deleteMember(url) {
    return new Promise((resolve, reject) => {
        __MEMBERS__
            .doc(url)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
                resolve(true);
            })
            .catch(error => {
                console.log("delete error");
                console.error("Error removing document: ", error);
            });
    });
}
