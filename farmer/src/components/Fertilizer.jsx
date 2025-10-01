import React, { useState } from "react";
import { motion } from "framer-motion";

function Fertilizer() {
  const [formData, setFormData] = useState({
    crop: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    ph: "",
    soilMoisture: "",
  });

  const [message, setMessage] = useState("");
  const [predictedFertilizer, setPredictedFertilizer] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPredictedFertilizer("");

    const { crop, nitrogen, phosphorus, potassium, ph, soilMoisture } = formData;

    // Validation
    if (!crop.trim()) {
      setMessage("⚠️ Please enter the crop name.");
      return;
    }
    if (
      nitrogen < 0 || nitrogen > 200 ||
      phosphorus < 0 || phosphorus > 200 ||
      potassium < 0 || potassium > 300 ||
      ph < 3 || ph > 10 ||
      soilMoisture < 0 || soilMoisture > 100
    ) {
      setMessage("⚠️ Please enter values within the valid range.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://bhoomisetu-rvtj.onrender.com/predict/fertilizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Crop: crop,
          N: Number(nitrogen),
          P: Number(phosphorus),
          K: Number(potassium),
          pH: Number(ph),
          soil_moisture: Number(soilMoisture),
        }),
      });

      const data = await response.json();

      if (response.ok && data.recommended_fertilizer) {
        setPredictedFertilizer(data.recommended_fertilizer);
        setMessage("✅ Fertilizer recommendation received!");
        setFormData({
          crop: "",
          nitrogen: "",
          phosphorus: "",
          potassium: "",
          ph: "",
          soilMoisture: "",
        });
      } else {
        setMessage(`❌ ${data.error || "Failed to get recommendation"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Server not reachable");
    }
    setLoading(false);
  };

  return (
    <div style={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.card}
      >
        <h1 style={styles.heading}>🌿 Fertilizer Advisory</h1>
        <p style={styles.subHeading}>Provide crop & soil details for tailored recommendations</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            placeholder="Crop Name"
            style={styles.input}
            required
          />
          <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} placeholder="Nitrogen (0-200)" style={styles.input} />
          <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} placeholder="Phosphorus (0-200)" style={styles.input} />
          <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} placeholder="Potassium (0-300)" style={styles.input} />
          <input type="number" name="ph" value={formData.ph} onChange={handleChange} placeholder="Soil pH (3-10)" style={styles.input} step="0.1" />
          <input type="number" name="soilMoisture" value={formData.soilMoisture} onChange={handleChange} placeholder="Soil Moisture (%)" style={styles.input} />

          <motion.button
            type="submit"
            style={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Processing..." : "Get Recommendation"}
          </motion.button>
        </form>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              ...styles.message,
              color: message.startsWith("✅") ? "#155724" : "#721c24",
              fontSize: "16px",
            }}
          >
            {message}
          </motion.p>
        )}

        {predictedFertilizer && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={styles.resultBox}
          >
            <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1b5e20" }}>🌾 Recommended Fertilizer</h2>
            <p style={styles.resultText}>{predictedFertilizer}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff", // clean white background
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "650px",
    background: "#e8f5e9", // soft, professional green
    borderRadius: "25px",
    padding: "35px 30px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)", // subtle shadow
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: "8px",
  },
  subHeading: {
    fontSize: "15px",
    color: "#388e3c",
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    background: "#f1f8e9", // soft uniform green shade
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)", // subtle shadow for depth
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1.5px solid #a5d6a7",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
    background: "#ffffff", // inputs stay white for readability
  },
  inputFocus: {
    borderColor: "#43a047",
    boxShadow: "0 0 8px rgba(67,160,71,0.3)",
  },
  button: {
    padding: "14px",
    marginTop: "10px",
    borderRadius: "12px",
    fontWeight: "700",
    border: "none",
    background: "#43a047", // single green tone
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  },
  message: {
    marginTop: "15px",
    fontWeight: "600",
    fontSize: "16px",
  },
  resultBox: {
    marginTop: "30px",
    background: "#c8e6c9", // soft green highlight
    borderRadius: "25px",
    padding: "25px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
    textAlign: "center",
  },
  resultText: {
    fontSize: "20px",
    fontWeight: "700",
    marginTop: "12px",
    color: "#1b5e20",
  },
};


export default Fertilizer;
