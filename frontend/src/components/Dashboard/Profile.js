import { useEffect, useState } from "react";
import { getProfile, logout } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles.css"; // Import CSS

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("You need login!");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="profile-container">
      <h2>🙍 Profile</h2>
      {user ? (
        <div className="profile-card">
          <img
            src="https://via.placeholder.com/100"
            alt="Avatar"
            className="profile-avatar"
          />
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            🚪 Logout
          </button>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </div>
  );
};

export default Profile;
