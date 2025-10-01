import React, { useState } from "react";

function Feedback() {
  const [feedback, setFeedback] = useState({
    crops: "",
    fertilizerUseful: "",
    pestDetection: "",
    weatherAlerts: "",
    marketPrices: "",
    easeOfUse: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    for (let key in feedback) {
      if (!feedback[key].trim()) {
        setMessage("Please answer all the questions!");
        return;
      }
    }

    console.log("Farmer feedback submitted:", feedback);
    setMessage("Thank you! Your feedback has been submitted.");
    setFeedback({
      crops: "",
      fertilizerUseful: "",
      pestDetection: "",
      weatherAlerts: "",
      marketPrices: "",
      easeOfUse: "",
    });
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Farmer Feedback</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Question 1 */}
        <div style={styles.question}>
          <label style={styles.label}>1. Which crops do you cultivate?</label>
          <input
            type="text"
            name="crops"
            value={feedback.crops}
            onChange={handleChange}
            placeholder="e.g., Wheat, Maize"
            style={styles.input}
          />
        </div>

        {/* Question 2 */}
        <div style={styles.question}>
          <label style={styles.label}>2. Were the fertilizer and soil recommendations useful?</label>
          <select
            name="fertilizerUseful"
            value={feedback.fertilizerUseful}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="Somewhat">Somewhat</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Question 3 */}
        <div style={styles.question}>
          <label style={styles.label}>3. Did pest/disease detection help you?</label>
          <select
            name="pestDetection"
            value={feedback.pestDetection}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="Somewhat">Somewhat</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Question 4 */}
        <div style={styles.question}>
          <label style={styles.label}>4. Were the weather alerts and predictions accurate?</label>
          <select
            name="weatherAlerts"
            value={feedback.weatherAlerts}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="Somewhat">Somewhat</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Question 5 */}
        <div style={styles.question}>
          <label style={styles.label}>5. Did market price information help in decision making?</label>
          <select
            name="marketPrices"
            value={feedback.marketPrices}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="Somewhat">Somewhat</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Question 6 */}
        <div style={styles.question}>
          <label style={styles.label}>6. Is the system easy to use for farmers?</label>
          <select
            name="easeOfUse"
            value={feedback.easeOfUse}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select</option>
            <option value="Very easy">Very easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Submit Feedback</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// CSS in JS with softer green palette
const styles = {
  container: {
    maxWidth: "650px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #f0f7f4, #c8e6c9, #dcedc8)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.8s ease forwards",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2e7d32",
    marginBottom: "20px",
    animation: "bounce 1s infinite",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  question: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "600",
    color: "#2e7d32",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #a5d6a7",
    fontSize: "16px",
    outline: "none",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "2px solid #a5d6a7",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    marginTop: "10px",
    cursor: "pointer",
    backgroundColor: "#66bb6a",
    color: "#fff",
    padding: "12px 25px",
    borderRadius: "10px",
    fontWeight: "600",
    border: "none",
    transition: "all 0.3s ease",
  },
  message: {
    color: "#2e7d32",
    fontWeight: "600",
    marginTop: "15px",
    textAlign: "center",
  },
};

// Keyframe animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
  60% { transform: translateY(-3px); }
}
`, styleSheet.cssRules.length);

export default Feedback;
