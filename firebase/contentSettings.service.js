import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "./firebase.config.js";

const COLLECTION = "contentSettings";
const DOC_ID = "dailyWorkflow";

export async function getContentSettings() {
  const snapshot = await getDoc(doc(db, COLLECTION, DOC_ID));
  if (!snapshot.exists()) return null;
  return {
    id: snapshot.id,
    ...snapshot.data()
  };
}

export async function saveContentSettings(settings, user) {
  return setDoc(
    doc(db, COLLECTION, DOC_ID),
    {
      ...settings,
      updatedBy: user?.email || "",
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}
