import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // Adjust this if your FastAPI runs on a different port

export const predict = async (features: number[]) => {
    try {
        const response = await axios.post(`${API_URL}/predict`, { features });
        return response.data.prediction;
    } catch (error) {
        console.error("Prediction API error:", error);
        throw new Error("Failed to get prediction");
    }
};
