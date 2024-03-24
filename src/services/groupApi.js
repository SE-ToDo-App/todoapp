import { db, getUser } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";

import { DEFAULT_GROUP_NAME } from "../utils/constants";
import { generateTimestampKey } from "../utils/helper";
import { queryOptions } from "@tanstack/react-query";

const groupConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return data.groups ? Object.entries(data.groups).sort() : [];
  },
  toFirestore: (groups) => {
    return {
      groups: groups.reduce((acc, group) => {
        const id = generateTimestampKey("group");
        acc[id] = { name: group };
        return acc;
      }, {}),
    };
  },
};
export const groupLoader = async () => {
  const user = await getUser();
  const DEFAULT = [DEFAULT_GROUP_NAME, { name: DEFAULT_GROUP_NAME }];
  if (!user?.uid) return [DEFAULT];
  const userDocRef = doc(db, "users", user.uid).withConverter(groupConverter);
  const docSnap = await getDoc(userDocRef);
  if (!docSnap.exists()) {
    throw new Error("User not found");
  }
  const data = docSnap.data();
  return [DEFAULT, ...data];
};

export const groupQueryOptions = () =>
  queryOptions({
    queryKey: ["group"],
    queryFn: () => groupLoader(),
  });
