import "./styles/App.css";

// Import the functions you need from the SDKs you need
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
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { useEffect, useState } from "react";
import ProjectsList from "./components/ProjectsList";
import Tasklist from "./components/TaskList";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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
    completed: false,
  });

  const auth = getAuth();

  const signInUser = async function () {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    console.log(auth.currentUser);
    setUser(auth.currentUser);
  };

  const signOutUser = async function () {
    await signOut(auth);
    setUser(null);
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
    checkSignIn();
  });

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, `${user.uid}`);
    await addDoc(ref, { ...project });
    await getProjects();
    e.target.closest("form").reset();
  };

  const delProject = async function (e) {
    const projectID = e.target.closest("li").id;
    const docRef = doc(db, `${user.uid}`, projectID);
    await deleteDoc(docRef);
    await getProjects();
  };

  const handleActiveProject = function (e) {
    if (!e.target.id) return;
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

      e.target.closest("form").reset();
    } catch (error) {
      console.log(error);
    }
  };

  const delTask = async function (name) {
    const docRef = doc(db, `${user.uid}`, activeProject.id);
    const newTasks = activeProject.tasks.filter((t) => t.name !== name);
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

  const updateTaskComplete = async function (task, checkbox) {
    const docRef = doc(db, `${user.uid}`, activeProject.id);

    const newTasks = activeProject.tasks.filter((t) => t.name !== task.name);
    newTasks.push({ ...task, completed: checkbox });
    setActiveProject({
      ...activeProject,
      tasks: newTasks,
    });

    try {
      await updateDoc(docRef, {
        ...activeProject,
        tasks: [...newTasks],
      });

      await getProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Navbar user={user} signin={signInUser} signout={signOutUser} />
      <div className="app-wrapper">
        {!user ? (
          <SignUp />
        ) : (
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
                <button type="submit" disabled={project.name === ""}>
                  Add project
                </button>
              </form>
              <ProjectsList
                projects={projects}
                activeHandle={handleActiveProject}
                del={delProject}
              />
            </aside>
            <main>
              <form onSubmit={addTask}>
                <input
                  type="text"
                  onChange={(e) => setTask({ ...task, name: e.target.value })}
                />
                <button type="submit" disabled={task.name === ""}>
                  add task
                </button>
              </form>
              <div>
                {activeProject ? (
                  <Tasklist
                    tasks={activeProject.tasks}
                    delTask={delTask}
                    handleChecked={updateTaskComplete}
                  />
                ) : (
                  <p>please select a project</p>
                )}
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
