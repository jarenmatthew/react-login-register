import { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";

function LoginPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        navigate("/home");
        return;
      }

      alert(`${data.error}`);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert("❌ Could not connect to server");
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome!</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account yet?
        <Link to="/register" className="link">
          {" "}
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
