import axios from "axios";

const API_URL = "http://localhost:3000";

const getExams = async () => {
  const response = await axios.get(`${API_URL}/examenes`);
  return response.data;
};

const createExam = async (data) => {
  const response = await axios.post(`${API_URL}/examenes`, data);
  return response.data;
};
const updateExam = async (id, data) => {
  const response = await axios.put(`${API_URL}/examenes/${id}`, data);
  return response.data;
};

const deleteExam = async (id) => {
  await axios.delete(`${API_URL}/examenes/${id}`);
};


export default { getExams, updateExam, deleteExam, createExam }