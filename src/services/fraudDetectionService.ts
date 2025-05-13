import axios from "axios";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/CiferAI/cifer-fraud-detection-k1-a";

export const runFraudDetection = async (payload: {
  userId: string;
  amount: number;
  accountAge: number;
  frequency: number;
}) => {
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: payload },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const prediction = response.data[0]; 
    return prediction; 
  } catch (error: any) {
    console.error("Fraud detection API error:", error.response?.data || error.message);
    throw new Error("Failed to run fraud detection");
  }
};
