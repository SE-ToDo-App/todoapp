import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.config';

export const fetchTodos = async () => {
  console.log('fetchTodos');
  const querySnapshot = await getDocs(collection(db, "todos"));
  console.log(querySnapshot);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};