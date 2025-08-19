import { Navigate, useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    alert("Logging out...");
    navigate("/");
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const { firstName, lastName, email } = user;

  return (
    <div className="home-container">
      <div className="home-header">
        <p className="user-email">{email}</p>
        <button className="home-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="home-body">
        <h1>
          Hello {firstName} {lastName}!
        </h1>
      </div>
    </div>
  );
}

export default HomePage;
