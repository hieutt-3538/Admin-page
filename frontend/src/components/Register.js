import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Đăng ký thành công, hãy đăng nhập!");
      navigate("/login");
    } catch (error) {
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Tên" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default Register;
