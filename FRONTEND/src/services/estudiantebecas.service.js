import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

async function getEstudiantesBecas() {
  const res = await axios.get(`${API_URL}/estudiantesbecados`);
  const data = res.data; // axios ya parsea la respuesta en JSON automáticamente
  return data;
}

async function createEstudianteBeca(data) {
  const res = await axios.post(`${API_URL}/estudiantesbecados`, data);
  return res.data; // axios ya parsea la respuesta en JSON automáticamente
}

async function updateEstudianteBeca(id, data) {
  const res = await axios.put(`${API_URL}/estudiantesbecados/${id}`, data);
  return res.data; // axios ya parsea la respuesta en JSON automáticamente
}

async function deleteEstudianteBeca(id) {
  await axios.delete(`${API_URL}/estudiantesbecados/${id}`);
}

export default { getEstudiantesBecas, createEstudianteBeca, updateEstudianteBeca, deleteEstudianteBeca };
