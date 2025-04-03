import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/dashboard">🏠 Home</Link>
        </li>
        <li>
          <Link to="/dashboard/users">👥 Users management</Link>
        </li>
        <li>
          <Link to="/dashboard/profile">🙍 Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
