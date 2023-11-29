import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase"; // Adjust the path as needed
import "./style.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message on new submission

    if (!email || !password || !firstName || !lastName || !username) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        username,
        email,
        skills,
        education,
        workExperience,
        contact,
      });

      navigate("/"); // Redirect on successful signup
    } catch (error) {
      // Set error message based on the error occurred
      setError(error.message);
    }
  };

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center">Register</h3>

          {/* Display error message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-2">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              id="fname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
              id="lname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="username">Github Username</label>
            <input
              type="text"
              placeholder="Enter Github Username"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Skills input area */}
          <div className="mb-2">
            <label htmlFor="skills">Skills</label>
            <textarea
              placeholder="Enter Skills"
              className="form-control"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={3} // You can adjust the number of rows as needed
            />
          </div>

          {/* Education input area */}
          <div className="mb-2">
            <label htmlFor="education">Education</label>
            <textarea
              placeholder="Enter Education"
              className="form-control"
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              rows={3} // Adjust the number of rows as needed
            />
          </div>

          {/* Work Experience input area */}
          <div className="mb-2">
            <label htmlFor="workExperience">Work Experience</label>
            <textarea
              placeholder="Enter Work Experience"
              className="form-control"
              id="workExperience"
              value={workExperience}
              onChange={(e) => setWorkExperience(e.target.value)}
              rows={3} // Adjust the number of rows as needed
            />
          </div>

          {/* New input field for contact */}
          <div className="mb-2">
            <label htmlFor="contact">Contact</label>
            <input
              type="text"
              placeholder="Enter Contact"
              className="form-control"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>

          <p className="text-right mt-2">
            Forgot <a href="/reset-password">Password?</a>
            Already Registered
            <Link to="/" className="ms-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
