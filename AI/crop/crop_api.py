from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# Load model & label encoder
model = joblib.load("crop_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Input structure
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

app = FastAPI(title="Crop Recommendation API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000","http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")  # ✅ endpoint is now /predict
def predict_crop(data: CropInput):
    df = pd.DataFrame([data.model_dump()])
    prediction_encoded = model.predict(df)[0]
    prediction = label_encoder.inverse_transform([prediction_encoded])[0]
    return {"recommended_crop": prediction}
