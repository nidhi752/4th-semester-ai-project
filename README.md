# 🚀 Drug Discovery with Machine Learning and FastAPI

Welcome to the **Drug Discovery Acceleration Project**!  
This repository demonstrates the use of a trained **Multi-Layer Perceptron (MLP)** model for predicting molecular properties, deployed through a **FastAPI** server for real-time access.

---

## 🧠 Project Overview

Traditional drug discovery processes are time-consuming and expensive.  
This project aims to **accelerate** early-stage drug discovery by using a machine learning model trained on molecular features to predict bioactivity — enabling faster screening of potential drug candidates.

The project includes:
- A trained **MLP neural network** model built using **TensorFlow/Keras**.
- A **FastAPI** application to serve the model and expose endpoints for real-time predictions.

---

## 🏗️ Project Structure

```
├── main.py          # FastAPI application with endpoints
├── trial2.keras     # Pre-trained MLP model
├── README.md        # Project documentation
└── requirements.txt # Dependencies (if any)
```

---

## 🔥 How to Run the Project

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/drug-discovery-fastapi.git
   cd drug-discovery-fastapi
   ```

2. **Install required packages:**
   ```
   pip install fastapi uvicorn pydantic tensorflow numpy
   ```

3. **Start the FastAPI server:**
   ```
   uvicorn main:app --reload
   ```

4. **Access in browser:**
   - Home page: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
   - Interactive Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🌟 API Endpoints

- `GET /`
  - Check if the server is running.
  - Response: `{ "message": "MLP Drug Discovery API is running!" }`
  
- `POST /predict`
  - Input: JSON object containing a list of molecular feature values.
  - Example input:
    ```json
    {
      "features": [0.0093, 0.6553, 0.5772, 0.6876]
    }
    ```
  - Response: Predicted output from the trained MLP model.
  - Example output:
    ```json
    {
      "prediction": 0.7482
    }
    ```

---

## 📸 Preview

| Home Page | Swagger UI | Prediction Example |
|:---------:|:----------:|:------------------:|
| ![Home Screenshot](5th.png) | ![Prediction Screenshot](1st.png)(2nd.png)(3rd.png)(4th.png) |

*(Replace the paths above with your actual screenshot paths.)*

---

## 🧩 Tech Stack

- **Python 3.11+**
- **TensorFlow / Keras** — Neural network modeling
- **FastAPI** — Web server framework
- **Uvicorn** — ASGI server
- **Pydantic** — Request validation
- **NumPy** — Data handling

---

## 🚀 Future Enhancements

- Deploy to AWS / GCP for public access.
- Expand model to multi-output predictions (classification + regression).
- Implement security (authentication, CORS policies).
- Add database integration for storing historical predictions.

---

## 🙌 Acknowledgements

- [TensorFlow Documentation](https://www.tensorflow.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- Inspiration from latest research on AI-driven drug discovery (Nature, Science, IEEE papers).

---

## 📜 License

This project is licensed for educational purposes only.  
© 2025 Nidhi Kuntal

---

# ✨ Thank you for exploring the project!
