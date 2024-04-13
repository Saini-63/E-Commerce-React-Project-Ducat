import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const addUserToFirebase = async (user) => {
    //console.log(user);
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
}

export const getUserFromFirebase = async () => {
    const q = query(collection(db, "users"));

    let users = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        let user = doc.data();
        user.id = doc.id;
        users.push(user);
    });
    //console.log(users);
    return users;
}

export const deleteUserToFirebase = async (user) => {
    //console.log(user);
    await deleteDoc(doc(db, "users", user.id));
}

export const updateUserToFirebase = async (user) => {
    const userRef = doc(db, "users", user.id);

    await updateDoc(userRef, user);
}