from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

# Load fertilizer CSV
fert_data = pd.read_csv("fertilizer.csv")
fert_data['Crop'] = fert_data['Crop'].str.lower()  # lowercase for lookup

# FastAPI app
app = FastAPI()

# Input model
class FertilizerInput(BaseModel):
    crop: str

# Helper function for N, P, K recommendation
def nutrient_recommendation(nutrient_name, value):
    if value > 70:
        return f"Apply high {nutrient_name} fertilizer ({value} units)"
    elif value > 40:
        return f"Apply moderate {nutrient_name} fertilizer ({value} units)"
    else:
        return f"Apply low {nutrient_name} fertilizer ({value} units)"

# Endpoint: Fertilizer Recommendation
@app.post("/fertilizer")
def recommend_fertilizer(data: FertilizerInput):
    crop_name = data.crop.lower()
    fert_info = fert_data[fert_data['Crop'] == crop_name]
    
    if fert_info.empty:
        return {"crop": data.crop, "recommended_fertilizer": ["No recommendation available"]}
    
    row = fert_info.iloc[0]
    
    recommendations = []
    
    # N, P, K recommendation
    recommendations.append(nutrient_recommendation("nitrogen", row['N']))
    recommendations.append(nutrient_recommendation("phosphorus", row['P']))
    recommendations.append(nutrient_recommendation("potassium", row['K']))
    
    # Soil pH
    if row['pH'] < 6:
        recommendations.append(f"Soil is acidic (pH {row['pH']}); consider liming")
    elif row['pH'] > 7:
        recommendations.append(f"Soil is alkaline (pH {row['pH']}); consider acidifying")
    else:
        recommendations.append(f"Soil pH is optimal ({row['pH']})")
    
    # Soil moisture
    if row['soil_moisture'] < 40:
        recommendations.append(f"Soil moisture is low ({row['soil_moisture']}%); irrigate adequately")
    elif row['soil_moisture'] > 70:
        recommendations.append(f"Soil moisture is high ({row['soil_moisture']}%); avoid waterlogging")
    else:
        recommendations.append(f"Soil moisture is optimal ({row['soil_moisture']}%)")
    
    # Return as list of points
    return {"crop": data.crop, "recommended_fertilizer": recommendations}
