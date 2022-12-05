import "../styles/signUp.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { getAuth, signInAnonymously, updateProfile } from "firebase/auth";

function SignUp() {
  const demoSignIn = async () => {
    try {
      const auth = getAuth();
      await signInAnonymously(auth);

      updateProfile(auth.currentUser, {
        displayName: "Demo User",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sign-up">
      <h2 className="sign-up-title">Welcome To Project Planner</h2>
      <div className="demo">
        <p className="sign-up-text">
          <strong>Preview the App here</strong>{" "}
          <button className="login-form-btn" onClick={demoSignIn}>
            Demo Login
          </button>
        </p>
      </div>
      <div className="forms">
        <div>
          <p className="sign-up-text">
            If you are new please <strong>Sign-up</strong>.
          </p>
          <SignUpForm />
        </div>

        <div>
          <p className="sign-up-text">
            Have an account please <strong>Log-in</strong>.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
