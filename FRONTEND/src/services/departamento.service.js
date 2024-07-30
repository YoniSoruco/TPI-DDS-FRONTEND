import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Ajusta la URL según tu configuración

 async function getDepartments() {

  const response = await axios.get(`${API_URL}/departamentos`);
  
  return response.data;
}

async function createDepartment(data)  {
  const response = await axios.post(`${API_URL}/departamentos`, data);
  return response.data;
}

async function updateDepartment(id, data){
  const response = await axios.put(`${API_URL}/departamentos/${id}`, data);
  return response.data;
}

async function deleteDepartment(id){
  await axios.delete(`${API_URL}/departamentos/${id}`);
}


export default {getDepartments,createDepartment,updateDepartment,deleteDepartment}