import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta la URL según tu configuración

async function getEstudiantes(){

  const response = await axios.get(`${API_URL}/estudiantes`);
  return response.data;
}

async function createEstudiante(data){
  const response = await axios.post(`${API_URL}/estudiantes`, data);
  return response.data;
}

async function updateEstudiante(id, data){
  const response = await axios.put(`${API_URL}/estudiantes/${id}`, data);
  return response.data;
}

async function deleteEstudiante(id){
  await axios.delete(`${API_URL}/estudiantes/${id}`);
}

export default {getEstudiantes,createEstudiante,updateEstudiante,deleteEstudiante}
