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
    // console.error(userData);
    // Cookies.set("authtoken", response.token);
    return response.token;
  } catch (error) {
    throw error.response.data; // Forward the error message to the UI
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, userData);
    localStorage.setItem("authToken", response.data.token); // return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateScore = async (level, score) => {
  console.error(level, score);

  const token = localStorage.getItem("authToken");
  console.log(token);

  console.error(token);
  const response = await axios.post(
    `${API_URL}game/score`,
    { level, score },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
