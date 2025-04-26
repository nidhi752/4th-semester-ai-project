from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import numpy as np
from tensorflow.keras.models import load_model

# Load the trained Keras model
model = load_model("trial2.keras")  # Change to "trial1.h5" if using H5 format

# Initialize FastAPI app
app = FastAPI()

# Define request model
class InputData(BaseModel):
    features: list[float] = Field(..., example=[0.0093, 0.6553, 0.5772, 0.6876])

@app.get("/")
def home():
    return {"message": "MLP Drug Discovery API is running!"}

@app.post("/predict")
def predict(data: InputData):
    try:
        # Convert input list to a NumPy array
        features_array = np.asarray(data.features, dtype=np.float32).reshape(1, -1)

        # Ensure correct input shape
        expected_features = model.input_shape[1]
        if features_array.shape[1] != expected_features:
            raise HTTPException(status_code=400,
                detail=f"Expected {expected_features} features, got {features_array.shape[1]}")

        # Run the prediction
        prediction = model.predict(features_array)[0][0]  # Extract scalar from NumPy array

        return {"prediction": float(prediction)}  # Ensure JSON serializability

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
