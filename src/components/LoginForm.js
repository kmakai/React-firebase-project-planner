import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error("Bad User Credentials");
    }
  };
  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="loginemail"
          name="email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="loginpassword"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit" className="login-form-btn">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
