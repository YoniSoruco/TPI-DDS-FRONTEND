import axios from "axios";

const API_URL = "http://localhost:3000";

const getQualifications = async () => {
  const response = await axios.get(`${API_URL}/calificaciones`);
  return response.data;
};

const createQualification = async (data) => {
  const response = await axios.post(`${API_URL}/calificaciones`, data);
  return response.data;
};

const updateQualification = async (id, data) => {
  const response = await axios.put(`${API_URL}/calificaciones/${id}`, data);
  return response.data;
};

const deleteQualification = async (id) => {
  await axios.delete(`${API_URL}/calificaciones/${id}`);
};

export default { createQualification, getQualifications, updateQualification, deleteQualification}