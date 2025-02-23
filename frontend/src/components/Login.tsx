import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginProps {
    setIsAuthenticated: (isAuth: boolean) => void;
  }

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);
      setIsAuthenticated(true);

      navigate("/tasks");
    } catch (err) {
      setError("Invalid username or password");
    }
  };
  const handleSignUpRedirect = () => {
    navigate("/signup");
  };
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don't have an account?</p>
        <button onClick={handleSignUpRedirect}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
