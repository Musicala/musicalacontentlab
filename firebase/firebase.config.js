import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

/**
 * 1. Creen un proyecto en Firebase.
 * 2. Activen Authentication > Google.
 * 3. Activen Cloud Firestore.
 * 4. Reemplacen estos valores por los de su proyecto.
 *
 * Sí, Firebase decidió que copiar configuraciones fuera un rito de iniciación moderno.
 */
export const firebaseConfig = {
  apiKey: "AIzaSyDCf0AdUdQ_-VqgD4tjq2hZ0tG5ibK3Ww8",
  authDomain: "musicala-content-lab.firebaseapp.com",
  projectId: "musicala-content-lab",
  storageBucket: "musicala-content-lab.firebasestorage.app",
  messagingSenderId: "982165051978",
  appId: "1:982165051978:web:521c70a77c13833bce24b3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
