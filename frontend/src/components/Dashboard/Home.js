import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles.css";

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserCount(response.data.length);
      } catch (error) {
        console.error("Error when get quantity of users", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="dashboard">
      <h2>📊 Overview statistics</h2>
      <div className="stats-container">
        <div className="stat-box">
          <h3>👥 Quantity of Users</h3>
          <p>{userCount}</p>
        </div>
        <div className="stat-box">
          <h3>📅 Today</h3>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
