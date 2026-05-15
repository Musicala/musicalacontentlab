import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "./firebase.config.js";

const COLLECTION = "contentIdeas";

export async function createIdea(idea, user) {
  return addDoc(collection(db, COLLECTION), {
    ...idea,
    suggestedFormats: Array.isArray(idea.suggestedFormats)
      ? idea.suggestedFormats
      : String(idea.suggestedFormats || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
    platforms: Array.isArray(idea.platforms)
      ? idea.platforms
      : String(idea.platforms || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
    status: idea.status || "available",
    usedCount: idea.usedCount || 0,
    createdBy: user?.email || "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

export async function updateIdea(ideaId, patch) {
  return updateDoc(doc(db, COLLECTION, ideaId), {
    ...patch,
    updatedAt: serverTimestamp()
  });
}

export async function deleteIdea(ideaId) {
  return deleteDoc(doc(db, COLLECTION, ideaId));
}

export async function getIdeas() {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}
