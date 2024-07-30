import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta la URL según tu configuración

async function getBecas() {

  const response = await axios.get(`${API_URL}/becas`);
  return response.data;
}

async function createBeca(data) {
  const response = await axios.post(`${API_URL}/becas`, data);
  return response.data;
}

async function updateBeca(id, data) {
  const response = await axios.put(`${API_URL}/becas/${id}`, data);
  return response.data;
}

async function deleteBeca(id) {
  console.log(id)
  await axios.delete(`${API_URL}/becas/${id}`);
}

export default { getBecas, createBeca, updateBeca, deleteBeca }