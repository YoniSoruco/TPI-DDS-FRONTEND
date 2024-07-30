import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta la URL según tu configuración

async function getProfessors(){
  const response = await axios.get(`${API_URL}/profesores`);
  return response.data;
}

async function createProfessor(data){
  const response = await axios.post(`${API_URL}/profesores`, data);
  return response.data;
}

async function updateProfessor(id, data){
  const response = await axios.put(`${API_URL}/profesores/${id}`, data);
  return response.data;
}

async function deleteProfessors(id){
  await axios.delete(`${API_URL}/profesores/${id}`);
}

export default {getProfessors,createProfessor,updateProfessor,deleteProfessors}