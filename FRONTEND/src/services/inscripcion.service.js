import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta la URL según tu configuración

async function getInscriptions(){
  const response = await axios.get(`${API_URL}/inscripciones`);
  return response.data;
};

async function createInscription(data){
  const response = await axios.post(`${API_URL}/inscripciones`, data);
  return response.data;
};

async function updateInscription(id, data){
  const response = await axios.put(`${API_URL}/inscripciones/${id}`, data);
  return response.data;
};

async function deleteInscription(id){
  await axios.delete(`${API_URL}/inscripciones/${id}`);
};

export default {getInscriptions,createInscription,updateInscription,deleteInscription}