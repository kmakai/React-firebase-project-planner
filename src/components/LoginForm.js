function LoginForm() {
  return (
    <div className="login-form-container">
      <form className="login-form">
        <label htmlFor="email">Email:</label>
        <input type="text" id="loginemail" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="loginpassword" name="password" />
        <button type="submit" className="login-form-btn">
          Log in
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
