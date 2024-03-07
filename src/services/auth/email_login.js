import { auth, db } from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {router} from "../../router";
import { DEFAULT_GROUP_NAME } from "../../utils/constants";
import toast from "react-hot-toast";

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.invalidate();
    router.navigate("/");
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};
export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      groups: { [DEFAULT_GROUP_NAME]: true },
    });
    await updateProfile(user, { displayName: name });
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};
