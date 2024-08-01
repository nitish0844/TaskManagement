import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1EpJAOsDiMgOk_qaPLhLrdi0SQnc7TGc",
  authDomain: "taskmanagement-29c73.firebaseapp.com",
  projectId: "taskmanagement-29c73",
  storageBucket: "taskmanagement-29c73.appspot.com",
  messagingSenderId: "408122090431",
  appId: "1:408122090431:web:a6b86fe1bb066b5c98f70a",
};

const app = initializeApp(firebaseConfig);

export const Storage_Bucket = getStorage(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
