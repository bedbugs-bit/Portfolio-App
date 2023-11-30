import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import signInWithEmailAndPassword
import { auth } from "../Firebase"; // Adjust the path as needed
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for storing error message
  const navigate = useNavigate(); // useNavigate for navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset the error on new submission

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Navigate to the home route on successful login
    } catch (error) {
      console.error("Error logging in: ", error.message);
      setError(error.message); // Update the error state with the error message
    }
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100">
      <div className="form_container p-5 rounded">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Sign in</h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}{" "}
          {/* Display error message */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
          <p className="text-right">
            Forgot <a href="/reset-password">Password?</a>
            <Link to="/signup" className="ms-2">
              Sign Up?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
