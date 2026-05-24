import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import AuthContext from "../../context/AuthContext.js";
import "./index.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Inside your Register component
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name || !email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        name,
        email,
        password,
        role,
      });

      if (response?.success) {
        // SUCCESS: Navigate to login page instead of dashboard
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Registration failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* LEFT SECTION: BRANDING IMAGE */}
        <div className="register-left-section">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
            alt="registration panel"
            className="register-image"
          />
        </div>

        {/* RIGHT SECTION: INTERACTIVE FORM UTILITY */}
        <div className="register-right-section">
          <div className="register-header">
            <h1>Create Account</h1>
            <p>
              Join us to start managing your events and booking tickets
              seamlessly
            </p>
          </div>

          {/* DYNAMIC ERROR CARD DISPLAY */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form className="register-form" onSubmit={onSubmitRegister}>
            {/* Full Name Field */}
            <div className="input-container">
              <label>Full Name</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="input-container">
              <label>Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Account Role Field */}
            <div className="input-container">
              <label>Account Type</label>
              <div className="input-wrapper">
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div className="input-container">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword((p) => !p)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Action Submit Button */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          {/* Login Redirection Link */}
          <div className="login-link-container">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
