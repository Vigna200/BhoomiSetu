import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [visible, setVisible] = useState(false);

  // Fade-in effect on mount
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <nav className={`navbar ${visible ? "fade-in" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">BhoomiSetu</Link>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/crop">Crop</Link>
            <Link to="/disease">Disease</Link>
            <Link to="/fertilizer">Fertilizer</Link>
            <Link to="/market">Market</Link>
            <Link to="/weather">Weather</Link>
            <Link to="/feedback">Feedback</Link>
          </div>
        </div>
      </nav>

      <style>{`
        /* Fade-in animation */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.8s ease forwards;
        }

        .navbar {
          background-color: #2e7d32;
          color: white;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 6px 10px rgba(0,0,0,0.15);
          transition: background-color 0.3s ease;
        }

        .navbar:hover {
          background-color: #388e3c;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          font-size: 26px;
          font-weight: bold;
          text-decoration: none;
          color: white;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .navbar-brand:hover {
          color: #a5d6a7;
          transform: scale(1.05);
        }

        .navbar-links a {
          margin-left: 20px;
          text-decoration: none;
          color: white;
          font-weight: 500;
          position: relative;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .navbar-links a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          left: 0;
          bottom: -2px;
          background-color: #a5d6a7;
          transition: width 0.3s ease;
        }

        .navbar-links a:hover {
          color: #a5d6a7;
          transform: scale(1.05);
        }

        .navbar-links a:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
