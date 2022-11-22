// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <header className="App-header">hello world</header>
      {console.log(auth)}
    </div>
  );
}

export default App;
