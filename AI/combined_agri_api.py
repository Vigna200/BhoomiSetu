from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os

# -----------------------------
# Get folder of this file
# -----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -----------------------------
# Paths to model folders
# -----------------------------
CROP_FOLDER = os.path.join(BASE_DIR, "crop")
FERTILIZER_FOLDER = os.path.join(BASE_DIR, "fertilizer")

# -----------------------------
# Load models & encoders
# -----------------------------
crop_model = joblib.load(os.path.join(CROP_FOLDER, "crop_model.pkl"))
label_encoder = joblib.load(os.path.join(CROP_FOLDER, "label_encoder.pkl"))

fertilizer_model = joblib.load(os.path.join(FERTILIZER_FOLDER, "fertilizer_model.pkl"))
crop_encoder = joblib.load(os.path.join(FERTILIZER_FOLDER, "crop_encoder.pkl"))

# -----------------------------
# Input schemas
# -----------------------------
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class FertilizerInput(BaseModel):
    Crop: str
    N: float
    P: float
    K: float
    pH: float
    soil_moisture: float

# -----------------------------
# FastAPI app setup
# -----------------------------
app = FastAPI(title="Agri Recommendation API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Crop prediction endpoint
# -----------------------------
@app.post("/predict/crop")
def predict_crop(data: CropInput):
    df = pd.DataFrame([data.model_dump()])
    prediction_encoded = crop_model.predict(df)[0]
    prediction = label_encoder.inverse_transform([prediction_encoded])[0]
    return {"recommended_crop": prediction}

# -----------------------------
# Fertilizer prediction endpoint
# -----------------------------
@app.post("/predict/fertilizer")
def predict_fertilizer(data: FertilizerInput):
    # Encode crop
    try:
        crop_encoded = crop_encoder.transform([data.Crop])[0]
    except:
        return {"error": f"Unknown crop '{data.Crop}'. Available crops: {list(crop_encoder.classes_)}"}

    df = pd.DataFrame([{
        "Crop": crop_encoded,
        "N": data.N,
        "P": data.P,
        "K": data.K,
        "pH": data.pH,
        "soil_moisture": data.soil_moisture
    }])
    prediction = fertilizer_model.predict(df)[0]
    return {"recommended_fertilizer": prediction}
