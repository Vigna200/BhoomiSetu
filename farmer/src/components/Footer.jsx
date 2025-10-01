import React, { useEffect, useState } from "react";

function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <footer className={`footer ${visible ? "fade-in" : ""}`}>
        <div className="footer-container">
          <div className="footer-section">
            <h3>BhoomiSetu</h3>
            <p>Empowering small and marginal farmers with AI-powered advisory services, crop guidance, and market insights.</p>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: support@bhoomisetu.com</p>
            <p>Phone: +91 789xx xxxxx</p>
            <p>Address: Hyderabad, India</p>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="mailto:support@bhoomisetu.com">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} BhoomiSetu — All rights reserved.
        </div>

        <style>{`
          /* Fade-in animation */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            animation: fadeIn 1s ease forwards;
          }

          .footer {
            background-color: #2e7d32;
            color: white;
            padding-top: 50px;
            padding-bottom: 25px;
            margin-top: 40px;
            transition: background-color 0.3s ease;
          }

          .footer:hover {
            background-color: #388e3c;
          }

          .footer-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 20px;
            gap: 20px;
          }

          .footer-section {
            flex: 1 1 250px;
            background-color: rgba(255,255,255,0.05);
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }

          .footer-section:hover {
            transform: translateY(-5px);
          }

          .footer-section h3 {
            font-size: 18px;
            margin-bottom: 12px;
            font-weight: bold;
          }

          .footer-section p {
            font-size: 14px;
            margin-bottom: 8px;
            line-height: 1.5;
            color: #c8e6c9;
          }

          .footer-social a {
            display: inline-block;
            margin-right: 12px;
            text-decoration: none;
            color: #c8e6c9;
            transition: color 0.3s ease, transform 0.3s ease;
          }

          .footer-social a:hover {
            color: #a5d6a7;
            transform: scale(1.1);
          }

          .footer-bottom {
            text-align: center;
            margin-top: 25px;
            font-size: 13px;
            color: #c8e6c9;
          }

          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              text-align: center;
            }

            .footer-section {
              margin-bottom: 20px;
            }
          }
        `}</style>
      </footer>
    </>
  );
}

export default Footer;
