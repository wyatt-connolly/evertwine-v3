import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Only initialize Firebase in browser environment and when we have proper config
const isClient = typeof window !== "undefined";
const hasValidConfig = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

// Initialize Firebase only in client environment with valid config
let app = null;
if (isClient && hasValidConfig) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
    app = null;
  }
}

// Initialize Firebase services with error handling - only in client
export const auth = (() => {
  if (!isClient || !app) return null;
  try {
    return getAuth(app);
  } catch (error) {
    console.warn("Auth initialization failed:", error);
    return null;
  }
})();

export const db = (() => {
  if (!isClient || !app) return null;
  try {
    return getFirestore(app);
  } catch (error) {
    console.warn("Firestore initialization failed:", error);
    return null;
  }
})();

export const storage = (() => {
  if (!isClient || !app) return null;
  try {
    return getStorage(app);
  } catch (error) {
    console.warn("Storage initialization failed:", error);
    return null;
  }
})();

export default app;
