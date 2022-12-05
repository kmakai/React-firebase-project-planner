import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDByEHTKbat6MQcsG6vwOdfHEe5K80QsLc",
  authDomain: "react-project-planner-bd320.firebaseapp.com",
  projectId: "react-project-planner-bd320",
  storageBucket: "react-project-planner-bd320.appspot.com",
  messagingSenderId: "756933992318",
  appId: "1:756933992318:web:6816ed89cde6010411dd2f",
  measurementId: "G-Z0978PBP6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
