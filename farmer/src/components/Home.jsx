import React from "react";
import heroImage from "../assets/hero-image.png";
import Chatbot from "./Chatbot";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BhoomiSetu</h1>
          <p>AI-powered crop advisory, soil insights, weather alerts, and market intelligence for small and marginal farmers.</p>
          <a href="#services" className="hero-button">Explore Services</a>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Farmers working in fields" />
        </div>
      </header>

      {/* Services Overview */}
      <section id="services" className="services-section">
        <h2>Our Solutions</h2>
        <div className="services-cards">
          <div className="card">
            <h3>Crop Advisory</h3>
            <p>Get precise recommendations for your crops based on soil & weather conditions.</p>
          </div>
          <div className="card">
            <h3>Pest & Disease Detection</h3>
            <p>Upload crop images and detect diseases early with AI-powered analysis.</p>
          </div>
          <div className="card">
            <h3>Fertilizer Guidance</h3>
            <p>Optimize fertilizer usage for better yield while saving costs.</p>
          </div>
          <div className="card">
            <h3>Market Insights</h3>
            <p>Track crop prices and plan sales for maximum profit.</p>
          </div>
          <div className="card">
            <h3>Weather Alerts</h3>
            <p>Receive real-time weather updates and predictive insights to protect your crops.</p>
          </div>
          <div className="card">
            <h3>Feedback & Support</h3>
            <p>Provide feedback and get support to improve our AI services continuously.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <h2>Why BhoomiSetu?</h2>
        <p>We empower over 86% of small Indian farmers with:</p>
        <ul>
          <li>Real-time crop advisory</li>
          <li>Soil health & fertilizer guidance</li>
          <li>AI-based pest/disease detection</li>
          <li>Weather-based alerts & insights</li>
          <li>Market price tracking</li>
          <li>Voice support for low-literate users</li>
        </ul>
      </section>

      {/* Chatbot Component */}
      <Chatbot />

      {/* Styles */}
      <style>{`
        /* General */
        * { box-sizing: border-box; margin:0; padding:0; }
        body { font-family: 'Segoe UI', sans-serif; background:#f0fdf4; color:#1b5e20; }

        /* Hero Section */
        .hero-section {
          display:flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg,#43a047,#a5d6a7);
          padding:60px 20px;
          border-radius:12px;
          margin:20px auto;
          max-width:1200px;
          box-shadow:0 8px 20px rgba(0,0,0,0.2);
          overflow:hidden;
        }
        .hero-content { max-width:600px; animation:fadeInLeft 1s ease forwards; }
        .hero-content h1 { font-size:48px; margin-bottom:20px; text-shadow:2px2px4px rgba(0,0,0,0.3); }
        .hero-content p { font-size:18px; margin-bottom:30px; }
        .hero-button {
          padding:12px 28px;
          background:#1b5e20;
          color:white;
          font-weight:bold;
          border-radius:8px;
          text-decoration:none;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .hero-button:hover { background:#4caf50; transform:scale(1.05); }
        .hero-image img { max-width:500px; border-radius:12px; animation:fadeInRight 1s ease forwards; }

        @keyframes fadeInLeft { 0% {opacity:0; transform:translateX(-50px);} 100% {opacity:1; transform:translateX(0);} }
        @keyframes fadeInRight { 0% {opacity:0; transform:translateX(50px);} 100% {opacity:1; transform:translateX(0);} }

        /* Services Section */
        .services-section { max-width:1200px; margin:60px auto; text-align:center; padding:0 20px; }
        .services-section h2 { font-size:36px; margin-bottom:40px; text-decoration:underline; text-decoration-color:#4caf50; }
        .services-cards {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
          gap:30px;
        }
        .card {
          background:#e8f5e9;
          padding:25px;
          border-radius:12px;
          box-shadow:0 6px 15px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover { transform: translateY(-8px) scale(1.03); box-shadow:0 12px 25px rgba(0,0,0,0.2); }
        .card h3 { margin-bottom:12px; color:#1b5e20; }
        .card p { font-size:16px; color:#2e7d32; }

        /* Impact Section */
        .impact-section {
          max-width:1000px;
          margin:60px auto;
          background:#d0f0c0;
          padding:40px;
          border-radius:12px;
          box-shadow:0 6px 15px rgba(0,0,0,0.1);
          animation:fadeInUp 1s ease forwards;
        }
        .impact-section h2 { font-size:32px; margin-bottom:20px; }
        .impact-section p { font-size:16px; margin-bottom:20px; }
        .impact-section ul { list-style: disc; padding-left:20px; font-size:16px; color:#1b5e20; }

        @keyframes fadeInUp { 0% { opacity:0; transform:translateY(30px); } 100% { opacity:1; transform:translateY(0); } }

        @media (max-width:768px){
          .hero-section { flex-direction:column; text-align:center; }
          .hero-image img { max-width:100%; margin-top:20px; }
        }
      `}</style>
    </>
  );
}

export default Home;
