import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRegister.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✔️ User registered successfully!");
        navigate("/");
        return;
      }

      const error = await response.json();
      alert(`${error.error}`);
    } catch (error) {
      console.error(`Error: ${error}`);
      alert("❌ Could not connect to server");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div className="name-input">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?
        <Link to="/" className="link">
          {" "}
          Log In
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
