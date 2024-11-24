import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../style/dashboard.css';

const Dashboard = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="dropdown">
            <button className="dropbtn" onClick={toggleDropdown}>
              Reports
            </button>
            {dropdownVisible && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/reports/annual">Annual Reports</Link>
                </li>
                <li>
                  <Link to="/reports/monthly">Monthly Reports</Link>
                </li>
                <li>
                  <Link to="/reports/financial">Financial Reports</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Dashboard




