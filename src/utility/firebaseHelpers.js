import {
  getDoc,
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

// USERS
export async function isUserAdmin(uid) {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() && userDoc.data().admin === true;
}

// PRODUCTS
export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      threshold: data.threshold ?? 0,
      preorderCount: data.preorderCount ?? 0,
    };
  });
}

export async function addProduct(newProduct) {
  const docRef = await addDoc(collection(db, 'products'), newProduct);
  return { id: docRef.id, ...newProduct };
}

export async function updateProduct(id, data) {
  await updateDoc(doc(db, 'products', id), data);
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, 'products', id));
}

// EVENTS
export async function fetchEvents() {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addEvent(newEvent) {
  const docRef = await addDoc(collection(db, 'events'), newEvent);
  return { id: docRef.id, ...newEvent };
}

export async function updateEvent(id, data) {
  await updateDoc(doc(db, 'events', id), data);
}

export async function deleteEvent(id) {
  await deleteDoc(doc(db, 'events', id));
}
