import { useEffect, useState } from "react";
import { getProfile, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("Bạn chưa đăng nhập!");
        navigate("/login");
      });
  }, []);

  return (
    <div>
      <h2>Thông Tin Cá Nhân</h2>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Tên: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => { logout(); navigate("/login"); }}>Đăng Xuất</button>
        </div>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default Profile;
