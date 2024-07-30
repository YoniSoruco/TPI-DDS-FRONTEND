import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust the URL according to your configuration

async function getAssignments() {
  const response = await axios.get(`${API_URL}/asignaciones`);
  return response.data;
}

async function createAssignment(data) {
  const response = await axios.post(`${API_URL}/asignaciones`, data);
  return response.data;
}

async function updateAssignment(id, data){
  const response = await axios.put(`${API_URL}/asignaciones/${id}`, data);
  return response.data;
}

async function deleteAssignment(id){
  await axios.delete(`${API_URL}/asignaciones/${id}`);
}

export default {getAssignments,createAssignment,updateAssignment,deleteAssignment}