import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const addProductToFirebase = async (product) => {
    //console.log(product);
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Document written with ID: ", docRef.id);
}

export const getProductFromFirebase = async () => {
    const q = query(collection(db, "products"));

    let products = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        let product = doc.data();
        product.id = doc.id;
        products.push(product);
    });
    //console.log(products);
    return products;
}

export const deleteProductToFirebase = async (product) => {
    //console.log(product);
    await deleteDoc(doc(db, "products", product.id));
}

export const updateProductToFirebase = async (product) => {
    const productRef = doc(db, "products", product.id);

    await updateDoc(productRef, product);
}