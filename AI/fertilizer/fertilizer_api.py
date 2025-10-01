from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# Load model & label encoder
model = joblib.load("fertilizer_model.pkl")
crop_encoder = joblib.load("crop_encoder.pkl")  # For encoding crop names

# Input structure
class FertilizerInput(BaseModel):
    Crop: str
    N: float
    P: float
    K: float
    pH: float
    soil_moisture: float

app = FastAPI(title="Fertilizer Recommendation API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def predict_fertilizer(data: FertilizerInput):
    # Encode crop
    try:
        crop_encoded = crop_encoder.transform([data.Crop])[0]
    except:
        return {"error": f"Unknown crop '{data.Crop}'. Available crops: {list(crop_encoder.classes_)}"}

    # Create DataFrame for model
    df = pd.DataFrame([{
        "Crop": crop_encoded,
        "N": data.N,
        "P": data.P,
        "K": data.K,
        "pH": data.pH,
        "soil_moisture": data.soil_moisture
    }])

    # Predict fertilizer
    prediction = model.predict(df)[0]
    return {"recommended_fertilizer": prediction}
