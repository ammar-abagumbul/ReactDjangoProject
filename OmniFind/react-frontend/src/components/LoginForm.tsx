import "../css/LoginPage.css";

function LoginForm() {
  return (
    <>
      <h1 className="boarder-bottom mb-4">Log In</h1>
      <div>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-info" type="submit">
          Login
        </button>
        <small className="text-muted ml-2">
          <a href="#">Forgot Password?</a>
        </small>
      </div>
    </>
  );
}

export default LoginForm;
