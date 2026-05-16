import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { db } from "./firebase.config.js";

const COLLECTION = "contentTasks";

function normalizeTask(task) {
  const normalized = {
    ...task,
    updatedAt: serverTimestamp()
  };

  if (Object.prototype.hasOwnProperty.call(task, "platforms")) {
    normalized.platforms = Array.isArray(task.platforms)
      ? task.platforms
      : String(task.platforms || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
  }

  return normalized;
}

export async function createTask(task, user) {
  return addDoc(collection(db, COLLECTION), {
    ...normalizeTask(task),
    sortOrder: Number.isFinite(Number(task.sortOrder)) ? Number(task.sortOrder) : 500,
    createdBy: user?.email || "",
    createdAt: serverTimestamp()
  });
}

export async function updateTask(taskId, patch) {
  return updateDoc(doc(db, COLLECTION, taskId), normalizeTask(patch));
}

export async function deleteTask(taskId) {
  return deleteDoc(doc(db, COLLECTION, taskId));
}

export async function getTasksByDate(dateString) {
  const q = query(
    collection(db, COLLECTION),
    where("date", "==", dateString)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data()
    }))
    .sort((a, b) => (a.sortOrder || 500) - (b.sortOrder || 500));
}

export async function getTasksByRange(startDate, endDate) {
  const q = query(
    collection(db, COLLECTION),
    where("date", ">=", startDate),
    where("date", "<=", endDate),
    orderBy("date", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}

export async function getRecentTasks(max = 80) {
  const q = query(
    collection(db, COLLECTION),
    orderBy("date", "desc"),
    limit(max)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
}

export async function changeTaskStatus(taskId, status, extra = {}) {
  const patch = {
    status,
    ...extra,
    updatedAt: serverTimestamp()
  };

  if (["published", "done"].includes(status)) {
    patch.completedAt = serverTimestamp();
  }

  return updateDoc(doc(db, COLLECTION, taskId), patch);
}
