import { UserError, db, getUser } from "./firebase.config";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import PropTypes from "prop-types";
import dayjs from "dayjs";
import { queryOptions } from "@tanstack/react-query";

export const TodoPropTypes = {
  id: PropTypes.string,
  todo: PropTypes.string,
  group: PropTypes.string,
  isCompleted: PropTypes.bool,
  createdAt: PropTypes.string,
  createdBy: PropTypes.string,
  notes: PropTypes.string,
  tags: PropTypes.array,
  dueDate: PropTypes.string,
};

export const todoCount = async (group) => {
  const user = await getUser();
  if (!user) return 0;
  const q = query(
    collection(db, "todos"),
    where("createdBy", "==", user.uid),
    where("group", "==", group)
  );
  return (await getCountFromServer(q)).data().count;
};

export const todoLoader = async (group) => {
  const user = await getUser();
  if (!user) return [];
  const q = query(
    collection(db, "todos"),
    where("createdBy", "==", user.uid),
    where("group", "==", group)
  );
  const data = await getDocs(q);
  return data.docs
    .map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        dueDate: data.dueDate ? dayjs(data.dueDate) : null,
      };
    })
    .sort((a, b) => {
      console.log(a, b);
      if (a.isCompleted && !b.isCompleted) return -1;
      if (!a.isCompleted && b.isCompleted) return 1;
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });
};

export const addTodo = async ({ todo, group }) => {
  const user = await getUser();
  if (!user) throw UserError;
  const current = new Date();
  console.log(todo, group);
  return await addDoc(collection(db, "todos"), {
    todo,
    group,
    isCompleted: false,
    createdAt: current.toISOString(),
    createdBy: user.uid,
    notes: "",
    tags: [],
    dueDate: "",
  });
};

export const editTodo = async ({ id, ...props }) => {
  const user = await getUser();
  if (!user) throw UserError;
  return await updateDoc(doc(db, "todos", id), props);
};

export const todoCountOptions = (group) =>
  queryOptions({
    queryKey: ["todoCount", group],
    queryFn: () => todoCount(group),
  });

export const todoOptions = (group) =>
  queryOptions({
    queryKey: ["todos", group],
    queryFn: () => todoLoader(group),
  });
