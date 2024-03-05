import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

import { DEFAULT_GROUP_NAME } from "../../utils/constants";
import { db } from "../firebase.config";
import toast from "react-hot-toast";

export const addTodo = async ({ todo, group = DEFAULT_GROUP_NAME, user }) => {
  if (!user?.uid) return;
  const current = new Date();
  try {
    await addDoc(collection(db, "todos"), {
      todo,
      group,
      isCompleted: false,
      createdAt: current.toISOString(),
      createdBy: user.uid,
    });
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

export const useTodos = (user, group = DEFAULT_GROUP_NAME) => {
  const q = user?.uid
    ? query(
        collection(db, "todos"),
        where("createdBy", "==", user.uid),
        where("group", "==", group)
      )
    : null;
  return useCollectionData(q);
};

const groupConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return data.groups ? Object.keys(data.groups) : [];
  },
  toFirestore: (groups) => {
    return {
      groups: Object.fromEntries(groups.map((group) => [group, true])),
    };
  },
};
export const useGroups = (user) => {
  const userDocRef = user?.uid
    ? doc(db, "users", user.uid).withConverter(groupConverter)
    : null;
  return useDocumentData(userDocRef, {
    initialValue: [],
  });
};

export const addGroup = async ({ group, user }) => {
  try {
    if (!user?.uid) throw new Error("User not found");
    const newGroups = Array.isArray(group) ? group : [group];
    const userDocRef = doc(db, "users", user.uid).withConverter(
      groupConverter
    );
    const data = await setDoc(userDocRef, newGroups, { merge: true });
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

export const groupLoader = async (user) => {
  if (!user?.uid) return { groups: [DEFAULT_GROUP_NAME] };
  const userDocRef = doc(db, "users", user.uid).withConverter(groupConverter);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    throw new Error("User not found");
  }
  const userData = docSnap.data();
  return { groups: userData.groups };
};

export const todoCountLoader = async (user) => {
  const q = query(
    collection(db, "todos"),
    where("createdBy", "==", user.uid),
    where("group", "==", user.group)
  );
  const count = await getCountFromServer(q);
  return { count };
};
