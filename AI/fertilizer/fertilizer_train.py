# fertilizer_train.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
df = pd.read_csv("fertilizer.csv")

# Encode categorical column 'Crop'
le = LabelEncoder()
df['Crop'] = le.fit_transform(df['Crop'])

# Features and target
X = df[['Crop', 'N', 'P', 'K', 'pH', 'soil_moisture']]
y = df['Fertilizer']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Accuracy
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy*100:.2f}%")

# Save model and label encoder
joblib.dump(model, 'fertilizer_model.pkl')
joblib.dump(le, 'crop_encoder.pkl')
print("Model and encoder saved successfully!")
