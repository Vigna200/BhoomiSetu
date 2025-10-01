import React, { useState } from "react";
import { motion } from "framer-motion";

function Crop() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [message, setMessage] = useState("");
  const [predictedCrop, setPredictedCrop] = useState("");
  const [loading, setLoading] = useState(false);

  const ranges = {
    nitrogen: [0, 140],
    phosphorus: [5, 145],
    potassium: [5, 205],
    temperature: [5, 45],
    humidity: [10, 100],
    ph: [3, 10],
    rainfall: [20, 300],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value !== "") {
      const num = Number(value);
      const [min, max] = ranges[name];
      if (isNaN(num) || num < min || num > max) {
        setMessage(`⚠️ ${name} must be between ${min} and ${max}`);
      } else {
        setMessage("");
      }
    } else {
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPredictedCrop("");

    for (let key in ranges) {
      const [min, max] = ranges[key];
      const value = Number(formData[key]);
      if (isNaN(value) || value < min || value > max) {
        setMessage(`⚠️ ${key} must be between ${min} and ${max}`);
        return;
      }
    }

    setLoading(true);
    try {
      const res = await fetch("https://bhoomisetu-rvtj.onrender.com/predict/crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N: Number(formData.nitrogen),
          P: Number(formData.phosphorus),
          K: Number(formData.potassium),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setPredictedCrop(data.recommended_crop);
        setMessage("✅ Data submitted successfully!");
        setFormData({
          nitrogen: "",
          phosphorus: "",
          potassium: "",
          temperature: "",
          humidity: "",
          ph: "",
          rainfall: "",
        });
      } else {
        setMessage(`❌ ${data.detail || "Error submitting data"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Server not reachable");
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
        .crop-container {
          max-width: 720px;
          margin: 3rem auto;
          padding: 2.5rem 2rem;
          background: linear-gradient(145deg, #d9f2e6, #b8e6c1);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 100, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        .crop-title {
          text-align: center;
          font-size: 2.3rem;
          font-weight: 800;
          color: #0b3d2e;
          margin-bottom: 2rem;
          letter-spacing: 0.5px;
        }
        .crop-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          font-weight: 600;
          color: #107158;
          margin-bottom: 0.4rem;
        }
        .form-group input {
          padding: 0.75rem;
          border: 2px solid #90e0b0;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.95);
          font-weight: 500;
        }
        .form-group input:focus {
          border-color: #16a34a;
          outline: none;
          box-shadow: 0 0 12px rgba(22,163,74,0.35);
          background: #fff;
        }
        .form-group small {
          color: #065f46;
          font-size: 0.75rem;
          margin-top: 0.2rem;
        }
        .submit-btn {
          grid-column: span 2;
          padding: 1rem;
          background: linear-gradient(90deg, #16a34a, #0f9d58);
          color: white;
          font-weight: 700;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 16px rgba(0,128,0,0.25);
        }
        .submit-btn:hover {
          background: linear-gradient(90deg, #0f9d58, #16a34a);
          transform: scale(1.05);
        }
        .submit-btn:disabled {
          background: #a3f0c1;
          cursor: not-allowed;
        }
        .success-message {
          grid-column: span 2;
          text-align: center;
          margin-top: 1.2rem;
          font-weight: 700;
          font-size: 1rem;
          animation: fadeIn 0.5s ease-in-out;
        }
        .success-message.success {
          color: #065f46;
        }
        .success-message.error {
          color: #dc2626;
        }
        .loading {
          grid-column: span 2;
          text-align: center;
          margin-top: 1rem;
          color: #16a34a;
          font-weight: 700;
        }
        .predicted-crop {
          grid-column: span 2;
          text-align: center;
          margin-top: 1.5rem;
          font-size: 1.5rem;
          font-weight: 800;
          color: #0b3d2e;
          padding: 1rem 1.2rem;
          background: linear-gradient(90deg, #a3f0c1, #16a34a);
          border-radius: 14px;
          box-shadow: 0 5px 18px rgba(0, 100, 0, 0.3);
          animation: pop 0.5s ease forwards;
        }
        @keyframes fadeIn { from {opacity:0;} to {opacity:1;} }
        @keyframes pop { 0% {transform: scale(0.85);} 100% {transform: scale(1);} }
      `}</style>

      <motion.div
        className="crop-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="crop-title">🌱 Crop Advisory Form</h2>

        <form onSubmit={handleSubmit} className="crop-form">
          {[
            { label: "Nitrogen (N)", name: "nitrogen", min: 0, max: 140 },
            { label: "Phosphorus (P)", name: "phosphorus", min: 5, max: 145 },
            { label: "Potassium (K)", name: "potassium", min: 5, max: 205 },
            { label: "Temperature (°C)", name: "temperature", min: 5, max: 45 },
            { label: "Humidity (%)", name: "humidity", min: 10, max: 100 },
            { label: "Soil pH", name: "ph", min: 3, max: 10 },
            { label: "Rainfall (mm)", name: "rainfall", min: 20, max: 300 }
          ].map((field, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="form-group">
              <label>{field.label}</label>
              <input
                type="number"
                step="any"
                name={field.name}
                min={field.min}
                max={field.max}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
              <small>Range: {field.min} – {field.max}</small>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="submit-btn"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Submitting..." : "Submit Data"}
          </motion.button>

          {loading && <p className="loading">⏳ Processing your data...</p>}

          {message && (
            <p
              className={`success-message ${message.startsWith("✅") ? "success" : "error"}`}
            >
              {message}
            </p>
          )}

          {predictedCrop && !loading && (
            <motion.p
              className="predicted-crop"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              🌾 Recommended Crop: <strong>{predictedCrop}</strong>
            </motion.p>
          )}
        </form>
      </motion.div>
    </>
  );
}

export default Crop;
