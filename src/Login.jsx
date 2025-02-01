import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLogin } = useContext(AuthContext); // Use context to update login state

  const handleLogin = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with matching email and password
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials. Please try again.");
      return;
    }

    // Mark user as logged in
    localStorage.setItem("isLogin", JSON.stringify(true));
    setLogin(true);

    alert("Login successful!");
    navigate("/home"); // Redirect to home page
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register Here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;