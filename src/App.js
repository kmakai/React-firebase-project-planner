import "./styles/App.css";

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
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import ProjectsList from "./components/ProjectsList";
import Tasklist from "./components/TaskList";
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
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    name: "",
    tasks: [],
  });
  const [activeProject, setActiveProject] = useState();

  const [task, setTask] = useState({
    name: "",
    desc: "",
    completed: false,
  });

  const checkSignIn = function () {
    auth.onAuthStateChanged((cu) => {
      if (cu) {
        // console.log("logged in", cu);
        setUser(cu);
        getProjects();
      } else {
        console.log("logged out");
      }
    });
  };

  const signIn = async function () {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    console.log(auth.currentUser);
    setUser(auth.currentUser);
  };

  const getProjects = async function () {
    if (user) {
      try {
        let arr = [];
        const psnaps = await getDocs(collection(db, `${user.uid}`));
        psnaps.forEach((doc) => {
          // console.log(doc.id, "==>", doc.data());
          arr.push({ ...doc.data(), id: doc.id });
        });

        setProjects(arr);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    checkSignIn();
  }, [user]);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, `${user.uid}`);
    const docRef = await addDoc(ref, { ...project });
    getProjects();
  };

  const handleActiveProject = function (e) {
    // console.log(e.target, e.target.id);
    // console.log(projects.find((p) => p.id === e.target.id));
    const p = projects.find((p) => p.id === e.target.id);
    setActiveProject({ ...p });
  };

  const addTask = async function (e) {
    e.preventDefault();
    const docRef = doc(db, `${user.uid}`, activeProject.id);
    setActiveProject({
      ...activeProject,
      tasks: [task, ...activeProject.tasks],
    });

    try {
      await updateDoc(docRef, {
        tasks: [...activeProject.tasks, task],
      });

      await getProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const delTask = async function (name) {
    const docRef = doc(db, `${user.uid}`, activeProject.id);
    const newTasks = activeProject.tasks.filter((t) => t.name !== name);
    console.log(newTasks);
    setActiveProject({
      ...activeProject,
      tasks: newTasks,
    });

    try {
      await updateDoc(docRef, {
        tasks: [...newTasks],
      });

      await getProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {!user && <button onClick={() => signIn()}>log in</button>}
      {user && (
        <>
          {" "}
          <aside>
            <form onSubmit={handleProjectSubmit}>
              <input
                type="text"
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
              <button type="submit">Add project</button>
            </form>
            <ProjectsList
              projects={projects}
              activeHandle={handleActiveProject}
            />
          </aside>
          <main>
            <form onSubmit={addTask}>
              <input
                type="text"
                onChange={(e) => setTask({ ...task, name: e.target.value })}
              />
              <button type="submit">add task</button>
            </form>
            <div>
              {activeProject ? (
                <Tasklist tasks={activeProject.tasks} delTask={delTask} />
              ) : (
                <p>please select a project</p>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
