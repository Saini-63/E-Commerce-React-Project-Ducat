import {
    collection,
    query,
    getDocs,
    addDoc,
} from "firebase/firestore";
import {
    db
} from "../../firebase-config";


export const getOrderFromFirebase = async () => {
    const q = query(collection(db, "orders"));

    let orders = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        let order = doc.data();
        order.id = doc.id;

        orders.push(order);
    });

    return orders;
}

export const placeOrderToFirebase = async (order) => {
    console.log(order);

    const docRef = await addDoc(collection(db, "orders"), order);
    // console.log(docRef);
    console.log("Document written with ID: ", docRef.id);
    localStorage.removeItem("current_cart_id");
    localStorage.removeItem('cart')
}