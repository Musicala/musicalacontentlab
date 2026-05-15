import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "./firebase.config.js";
import { getRecentTasks } from "./contentTasks.service.js";

const COLLECTION = "contentHistory";

export async function addHistoryEntry(entry, user) {
  return addDoc(collection(db, COLLECTION), {
    ...entry,
    createdBy: user?.email || "",
    createdAt: serverTimestamp()
  });
}

export async function getHistoryEntries(max = 80) {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"), limit(max));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}

export async function getTaskHistoryLike(max = 80) {
  const tasks = await getRecentTasks(max);
  return tasks.filter((task) =>
    ["recorded", "edited", "scheduled", "published", "done", "skipped"].includes(task.status)
  );
}
