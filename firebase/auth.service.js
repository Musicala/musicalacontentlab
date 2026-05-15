import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db, googleProvider } from "./firebase.config.js";
import { isAuthorizedEmail } from "../utils/permissions.js";

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  if (!isAuthorizedEmail(user.email)) {
    await signOut(auth);
    throw new Error("Este correo no está autorizado para usar Musicala Content Lab.");
  }

  await upsertUser(user);
  return user;
}

export async function signOutUser() {
  return signOut(auth);
}

export function listenAuth(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }

    if (!isAuthorizedEmail(user.email)) {
      await signOut(auth);
      callback(null);
      return;
    }

    await upsertUser(user);
    callback(user);
  });
}

export async function upsertUser(user) {
  if (!user?.uid) return;

  const ref = doc(db, "users", user.uid);
  const current = await getDoc(ref);

  await setDoc(
    ref,
    {
      uid: user.uid,
      email: user.email,
      name: user.displayName || user.email,
      role: "admin",
      photoURL: user.photoURL || "",
      lastLoginAt: serverTimestamp(),
      createdAt: current.exists() ? current.data().createdAt : serverTimestamp()
    },
    { merge: true }
  );
}
