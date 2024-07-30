import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Table from './Tabla.jsx';
import Form from './Form.jsx';
import profesorService from '../services/profesor.service.js';

function Profesor() {
  const [professors, setProfessors] = useState([]);
  const [currentProfessor, setCurrentProfessor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'apellido', label: 'Apellido', type: 'text' },
    { name: 'fecha_contratacion', label: 'Fecha Contratacion', type: 'date' },
    { name: 'id_departamento', label: 'Departmento', type: 'select' },
    { name: 'salario', label: 'Salario', type: 'float' },
    { name: 'telefono', label: 'Telefono', type: 'text' }
    
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await profesorService.getProfessors();
    setProfessors(data);
  };

  const handleDelete = async (id) => {
    const professor = professors.find((p) => p.id === id);
    if (professor) {
      await profesorService.updateProfessor(id, { ...professor, activo: 0 });
      loadData();
    }
  };

  const handleEdit = (id) => {
    const professor = professors.find((p) => p.id === id);
    setCurrentProfessor(professor);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentProfessor) {
      await profesorService.updateProfessor(currentProfessor.id, data);
    } else {
      await profesorService.createProfessor(data);
    }
    setShowModal(false);
    setCurrentProfessor(null);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProfessor(null);
  };

  return (
    <div>
      <h1>Profesores</h1>
      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Profesor
      </Button>
      <Form
        fields={fields}
        initialData={currentProfessor || {}}
        onSubmit={handleSubmit}
        componente={"Profesor"}
        isEditing={currentProfessor !== null}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table 
      data={professors} 
      onDelete={handleDelete} 
      onEdit={handleEdit} 
      componente={"Profesor"}
      />
    </div>
  );
}

export { Profesor };
