import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLogin } = useContext(AuthContext); // Use context to update login state

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login button clicked!");
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    try {
      const response = await fetch("https://movie-qp7k.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("API Response Status:", response.status);

      const data = await response.json();
      console.log("API Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      setLogin(true);

      alert("Login successful!");
      navigate("/home"); // Redirect to home page
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
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