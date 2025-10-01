import React, { useState } from "react";

function Disease() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setMessage("Please upload an image first!");
      return;
    }

    try {
      // Convert base64 to blob
      const blob = await (await fetch(image)).blob();
      const formData = new FormData();
      formData.append("file", blob, "crop.jpg");

      // Send to backend
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setImage(null); // clear previous image
      } else {
        setMessage("Upload failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error uploading image.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Disease Detection</h2>
      <p style={styles.paragraph}>Upload crop images for AI-powered disease detection.</p>

      <div style={styles.buttonContainer}>
        <label style={styles.uploadButton}>
          Choose Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </label>

        {image && (
          <div style={styles.imageContainer}>
            <img src={image} alt="Uploaded Crop" style={styles.image} />
          </div>
        )}

        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

// CSS in JS
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #e0f2f1, #a5d6a7, #c8e6c9)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
    animation: "fadeIn 0.8s ease forwards",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1b5e20",
    marginBottom: "15px",
    animation: "bounce 1s infinite",
  },
  paragraph: {
    fontSize: "16px",
    color: "#2e7d32",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  uploadButton: {
    cursor: "pointer",
    backgroundColor: "#388e3c",
    color: "#fff",
    padding: "12px 25px",
    borderRadius: "10px",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  submitButton: {
    cursor: "pointer",
    backgroundColor: "#2e7d32",
    color: "#fff",
    padding: "12px 25px",
    borderRadius: "10px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    border: "none",
  },
  imageContainer: {
    marginTop: "10px",
  },
  image: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
    borderRadius: "15px",
    border: "3px solid #66bb6a",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.8s ease forwards",
  },
  message: {
    color: "#1b5e20",
    fontWeight: "600",
    marginTop: "10px",
  },
};

// Add keyframe animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
`, styleSheet.cssRules.length);

export default Disease;
