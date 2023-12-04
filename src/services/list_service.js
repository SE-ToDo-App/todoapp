import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.config';

const fetchLists = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};