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
  deleteField,
  getDocs
} from "firebase/firestore";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import tinycolor from 'tinycolor2'
import { db } from "./firebase.config";
import toast from "react-hot-toast";
import {router } from "../router";
import { generateTimestampKey } from "../utils/helper";
import { DEFAULT_GROUP_NAME } from "../utils/constants";

export const addTodo = async ({ todo, group, user }) => {
  if (!user?.uid) throw new Error("User not found");
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

export const useTodos = (user, group="") => {
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
    return data.groups ? Object.entries(data.groups).sort() : [];
  },
  toFirestore: (groups) => {
    return {
      groups: groups.reduce((acc, group) => {
        const id = generateTimestampKey("group")
        acc[id] = { name: group };
        return acc;
      }
      , {})
    };
  },
};
const tagConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return data.tags ? Object.entries(data.tags).sort() : [];
  },
  toFirestore: ({name, color}) => {
    if (!tinycolor(color).isValid()) {
      color = "#000000"
    }
    const id = generateTimestampKey("tag")
    console.log("id", id)
    return {
      tags: { [id]:  {name, color} }
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

export const useTags = (user) => {
  const userDocRef = user?.uid
    ? doc(db, "users", user.uid).withConverter(tagConverter)
    : null;
  return useDocumentData(userDocRef, {
    initialValue: [],
  });
};

export const addTag = async ({ name, color, user }) => {
  try {
    if (!user?.uid) throw new Error("User not found");
    console.log("name", name, "color", color)
    const userDocRef = doc(db, "users", user.uid).withConverter(tagConverter);
    const data = await setDoc(userDocRef, {name, color}, { merge: true });
    router.invalidate()
    return data;
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
}
export const deleteTag = async ({ id, user }) => {
    if (!user?.uid) throw new Error("User not found");
    const userDocRef = doc(db, "users", user.uid)
    const update = updateDoc(userDocRef, {[`tags.${id}`]: deleteField()})
    toast.promise(update, {
      loading: "Deleting Tag",
      success: "Tag Deleted",
      error: "Failed to Delete Tag"
    })
    await update
    router.invalidate()
};
export const tagLoader = async (user) => {
  if (!user?.uid) return { tags: [] };
  const userDocRef = doc(db, "users", user.uid).withConverter(tagConverter);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    throw new Error("User not found");
  }
  return docSnap.data();
};



export const groupLoader = async (user) => {
  const DEFAULT = [DEFAULT_GROUP_NAME, { name: DEFAULT_GROUP_NAME }]
  if (!user?.uid) return [DEFAULT];
  const userDocRef = doc(db, "users", user.uid).withConverter(groupConverter);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    throw new Error("User not found");
  }
  const data = docSnap.data();
  return [DEFAULT, ...data];
};

export const todoCountLoader = async (user, group) => {
  if (!user?.uid) return 0;
  const q = query(
    collection(db, "todos"),
    where("createdBy", "==", user.uid),
    where("group", "==", group)
  );
  return (await getCountFromServer(q)).data().count;
};

export const todoLoader = async (user, group) => {
  if (!user?.uid) return [];
  const q = query(
    collection(db, "todos"),
    where("createdBy", "==", user.uid),
    where("group", "==", group)
  );
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data());
}