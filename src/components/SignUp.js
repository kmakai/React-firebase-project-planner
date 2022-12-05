import "../styles/signUp.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

function SignUp() {
  return (
    <div className="sign-up">
      <h2 className="sign-up-title">Welcome To Project Planner</h2>

      <p className="sign-up-text">
        If you are new please <strong>Sign-up</strong>.
      </p>
      <SignUpForm />
      <p className="sign-up-text">
        If you already have an account please <strong>Log-in</strong>.
      </p>
      <LoginForm />
    </div>
  );
}

export default SignUp;
