import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(config.apiKey && config.databaseURL && config.projectId && config.appId);
export const firebaseApp = firebaseConfigured ? (getApps().length ? getApps()[0] : initializeApp(config)) : null;
export const database = firebaseApp ? getDatabase(firebaseApp) : null;
export const DEVICE_ID = import.meta.env.VITE_DEVICE_ID || 'ROADWATCH-01';
