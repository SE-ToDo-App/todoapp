import { useEfct, useMemo } from "react";
import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../services/firebase.config";

const useTodos = (user) => {
  const todosRef = collection(db, "todos");
  const q = user ? query(todosRef, where("userId", "==", user.uid)) : null;
  const [snapshot, loading, error] = useCollection(q);

  const todos = useMemo(() => {
    return snapshot
      ? snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      : [];
  }, [snapshot]);

  return { todos, loading, error };
};

export default useTodos;
