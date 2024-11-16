import axios from "axios";

const API_URL = "http://localhost:5000/";

export const fetchQuestionAnswerPair = async () => {
  try {
    const response = await axios.get(`${API_URL}api/banana`);
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Banana API:", error.message);
    return null;
  }
};


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, userData);
    console.error(userData);
    return response.data;
  } catch (error) {
    throw error.response.data; // Forward the error message to the UI
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};