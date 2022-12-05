import "../styles/signUp.css";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

function SignUp() {
  return (
    <div className="sign-up">
      <h2 className="sign-up-title">Welcome To Project Planner</h2>
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
