import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function CustomerLogin() {
  const navigate = useNavigate();

  const [customerNumber, setCustomerNumber] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    const number = customerNumber.trim();

    if (!number) {
      alert("Please enter your customer number");
      return;
    }

    // Save customer number for the dashboard
    localStorage.setItem("customerNumber", number);

    // Go to customer dashboard
    navigate("/customer");
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          TariffIQ
        </div>

        {/* Customer Portal */}
        <p className="auth-role">
          CUSTOMER PORTAL
        </p>

        {/* Heading */}
        <h1>
          Welcome Back
        </h1>

        <p className="auth-description">
          Enter your customer number to view
          your personalized plan and usage.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label htmlFor="customerNumber">
              Customer Number
            </label>

            <input
              id="customerNumber"
              type="text"
              value={customerNumber}
              onChange={(event) =>
                setCustomerNumber(event.target.value)
              }
              placeholder="Enter customer number"
              autoComplete="off"
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        {/* Admin Login */}
        <button
          type="button"
          className="switch-login"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>

      </div>

    </div>
  );
}

export default CustomerLogin;