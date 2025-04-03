import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Register successful, Login again!");
      navigate("/login");
    } catch (error) {
      alert("Register fail, try again!");
    }
  };

  return (
    <div className="auth-container">
      <h2> Sign up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="auth-link" onClick={() => navigate("/login")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
