import { useContext, useState } from "react";

import { GraduationCap, Mail, Lock, Eye, EyeOff} from "lucide-react";
import "./style.css";
import { Authcontext } from "../context/Authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const usersApiUrl =
  process.env.REACT_APP_API_backendURL5;

export default function Login() {
 const navigate=useNavigate()
  const { setUsers } = useContext(Authcontext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function options() {
    if (!username.trim() || !password) {
      setError("Enter your username and password.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const { data: users } = await axios.get(usersApiUrl, { timeout: 10000 });
      if (!Array.isArray(users)) {
        throw new Error("The login service returned an invalid response.");
      }

      const user = users.find(
        (candidate) =>
          candidate.username?.trim() === username.trim() &&
          candidate.password === password
      );
      if (!user) {
        setError("Incorrect username or password.");
        return;
      }

      setUsers(user);
      navigate("/dashboard");
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(
          requestError.response
            ? `Login service error (${requestError.response.status}).`
            : "Could not connect to the login service. Make sure the backend is running."
        );
      } else {
        console.error(requestError);
        setError("An unexpected error occurred while signing in.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>
          Syria
          <br />
          <strong>Virtual University</strong>
        </h1>
      </div>

      <div className="login-right">
        <div className="login-container">
          <div className="login-icon">
            <GraduationCap size={30} />
          </div>

          <h2>Welcome Back!</h2>

          <p className="login-description">
            Sign in to continue to your account
          </p>

          <div className="input-group">
            <label>Username</label>

            <div className="input-box">
              <Mail size={18} />

              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                type="text"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="input-box">
              <Lock size={18} />

              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button
            type="button"
            className="login-button"
            onClick={options}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "login"}
          </button>

          <p className="copyright">© 2026 University Management System</p>
        </div>
      </div>
    </div>
  );
}
