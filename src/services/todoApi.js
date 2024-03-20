import { queryOptions } from "@tanstack/react-query";
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
import { db } from "./firebase.config";

export const todoCount= async (user, group) => {
  if (!user?.uid) return 0;
  const q = query(
    collection(db, "todos"),
    where("createdBy", "==", user.uid),
    where("group", "==", group)
  );
  return (await getCountFromServer(q)).data().count;
};

export const todoCountOptions = (group, user) => queryOptions({
  queryKey: ["todoCount", group, user],
  queryFn: () => todoCount(user, group),
});