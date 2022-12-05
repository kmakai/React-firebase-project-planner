import { useState } from "react";

function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = formData;

  const onChange = (e) => {
    console.log(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="login-form-container">
      <form className="login-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="email"
          value={name}
          onChange={onChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit" className="login-form-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
