import { logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>🚪 Logout</button>
    </div>
  );
};

export default Header;
