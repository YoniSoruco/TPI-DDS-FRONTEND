import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

async function getCursos(){
  const res = await axios.get(`${API_URL}/cursos`);
  const data = res.data; // axios ya parsea la respuesta en JSON automáticamente
  return data;
}

async function createCursos(data){
  const res = await axios.post(`${API_URL}/cursos`, data);
  return res.data; // axios ya parsea la respuesta en JSON automáticamente
}

async function updateCursos(id, data){
  const res = await axios.put(`${API_URL}/cursos/${id}`, data);
  return res.data; // axios ya parsea la respuesta en JSON automáticamente
}

async function deleteCursos(id){
  await axios.delete(`${API_URL}/cursos/${id}`);
}

export default {getCursos, createCursos, updateCursos, deleteCursos};
