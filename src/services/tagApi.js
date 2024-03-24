import { db, getUser } from "./firebase.config";
import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { generateTimestampKey } from "../utils/helper";
import { queryOptions } from "@tanstack/react-query";
import tinycolor from "tinycolor2";

const tagConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return data.tags ? Object.entries(data.tags).sort() : [];
  },
  toFirestore: ({ name, color }) => {
    if (!tinycolor(color).isValid()) {
      color = "#000000";
    }
    const id = generateTimestampKey("tag");
    console.log("id", id);
    return {
      tags: { [id]: { name, color } },
    };
  },
};
export const tagLoader = async () => {
  const user = await getUser();
  if (!user?.uid) return { tags: [] };
  const userDocRef = doc(db, "users", user.uid).withConverter(tagConverter);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    throw new Error("User not found");
  }
  return docSnap.data();
};

export const addTag = async ({ name, color }) => {
  const user = await getUser();
  console.log(user);
  if (!user) throw new Error("User not found");
  const userDocRef = doc(db, "users", user.uid).withConverter(tagConverter);
  const data = await setDoc(userDocRef, { name, color }, { merge: true });
  return data;
};

export const deleteTag = async ({ id }) => {
  const user = await getUser();
  if (!user) throw new Error("User not found");
  const userDocRef = doc(db, "users", user.uid);
  return await updateDoc(userDocRef, { [`tags.${id}`]: deleteField() });
};
export const tagQueryOptions = () =>
  queryOptions({
    queryKey: ["tags"],
    queryFn: () => tagLoader(),
  });
