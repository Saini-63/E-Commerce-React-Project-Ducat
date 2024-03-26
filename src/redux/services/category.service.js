import { collection, addDoc, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

export const addCategoryToFirebase = async (category) => {
    //console.log(category);
    const docRef = await addDoc(collection(db, "categories"), category);
    console.log("Document written with ID: ", docRef.id);
}

export const getCategoryFromFirebase = async () => {
    const q = query(collection(db, "categories"));

    let categories = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        let category = doc.data();
        category.id = doc.id;
        categories.push(category);
    });
    //console.log(categories);
    return categories;
}

export const deleteCategoryToFirebase = async (category) => {
    //console.log(category);
    await deleteDoc(doc(db, "categories", category.id));
}

export const updateCategoryToFirebase = async (category) => {
    const categoryRef = doc(db, "categories", category.id);

    await updateDoc(categoryRef, category);
}