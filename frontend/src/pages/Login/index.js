import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Importing context instead of lower-level api calls to leverage automatic storage caching
import AuthContext from "../../context/AuthContext.js";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();

  // FIXED: Destructured 'login' to match your AuthContext.js provider definition exactly
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    // Basic Validation Checks
    if (!email || !password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // FIXED: Route credentials through your unified context workflow.
      // This automatically updates the local React states and handles localStorage syncing under the hood.
      const response = await login({ email, password });

      if (response?.success) {
        const targetUser = response.user;

        // Dynamic Role-Based Redirection Routing Guard
        // Change to this:
        if (targetUser.role === "admin") {
          navigate("/admin"); // This matches your AppRoutes.js configuration
        } else if (targetUser.role === "organizer") {
          navigate("/organizer");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      // Safely unwraps standard error objects rejected via Axios interceptors
      setErrorMessage(error.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT BRANDING IMAGERY BANNER */}
        <div className="login-left-section">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop"
            alt="login brand panel"
            className="login-image"
          />
        </div>

        {/* RIGHT INTERACTIVE FORM UTILITY CONTROL SECTION */}
        <div className="login-right-section">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Login to continue managing your events and bookings</p>
          </div>

          {errorMessage && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "15px" }}
            >
              {errorMessage}
            </div>
          )}

          <form className="login-form" onSubmit={onSubmitLogin}>
            {/* Email Input Field container */}
            <div className="input-container">
              <label>Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input Field container */}
            <div className="input-container">
              <label>Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-password-button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me Context Toggle Checkbox Layout */}
            <div className="remember-container">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((previous) => !previous)}
                />
                Remember Me
              </label>
            </div>

            {/* Submit Action Control */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="register-link-container">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
