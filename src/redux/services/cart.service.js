import {
    collection,
    query,
    getDocs,
    addDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import {
    db
} from "../../firebase-config";
import { defaultValue } from "../reducers/cart.reducer";

export const getCartFromFirebase = async () => {
    const q = query(collection(db, "carts"));
    const querySnapshot = await getDocs(q);

    let currentCartId = localStorage.getItem("current_cart_id")

    let currentCartObject = defaultValue;

    querySnapshot.forEach((doc) => {
        if (doc.id === currentCartId) {
            currentCartObject = doc.data();
        }
    });

    return currentCartObject;
}

export const addCartToFirebase = async (cart) => {

    let currentCartId = localStorage.getItem("current_cart_id")

    if (currentCartId) {
        const docRef = doc(db, "carts", currentCartId);

        await updateDoc(docRef, cart);
    } else {
        const docRef = await addDoc(collection(db, "carts"), cart);

        localStorage.setItem("current_cart_id", docRef.id);
    }
}