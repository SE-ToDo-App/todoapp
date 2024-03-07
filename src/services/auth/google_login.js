import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { DEFAULT_GROUP_NAME } from "../../utils/constants";
import toast from "react-hot-toast";
import {router} from "../../router";
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        groups: { [DEFAULT_GROUP_NAME]: true },
      });
    }
    router.navigate({to: "/"});
    router.invalidate();

  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};
