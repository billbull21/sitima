// lib/fetchData.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

async function getDocumentsFromCollection(collectionName: string) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export { getDocumentsFromCollection };