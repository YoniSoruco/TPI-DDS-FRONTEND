import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Table from './Tabla.jsx';
import Form from './Form.jsx';
import asignacionService from '../services/asignacion.service.js';

function Asignacion() {
  const [assignments, setAssignments] = useState([]);
  const [currentAssignment, setCurrentAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fields = [
    { name: 'id_profesor', label: 'Profesor', type: 'select' },
    { name: 'id_curso', label: 'Curso', type: 'select' },
    { name: 'fecha_asignacion', label: 'Fecha Asignacion', type: 'date' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await asignacionService.getAssignments();
    setAssignments(data);
  };

  const handleDelete = async (id) => {
    const asignacion = assignments.find((a) => a.id === id);
    if (asignacion) {
      await asignacionService.updateAssignment(id, { ...asignacion, activo: 0 });
      loadData();
    }
  };



  const handleEdit = (id) => {
    const assignment = assignments.find((a) => a.id === id);
    setCurrentAssignment(assignment);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentAssignment) {
      await asignacionService.updateAssignment(currentAssignment.id, data);
    } else {
      await asignacionService.createAssignment(data);
    }
    setShowModal(true);
    setCurrentAssignment(null);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentAssignment(null);
  };

  return (
    <div>
      <h1>Asignaciones</h1>
      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Asignacion
      </Button>
      <Form
        fields={fields}
        initialData={currentAssignment || {}}
        onSubmit={handleSubmit}
        componente={"Asignacion"}
        isEditing={currentAssignment !== null}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table 
      data={assignments} 
      onDelete={handleDelete} 
      onEdit={handleEdit} 
      componente={"Asignacion"} 
      />
    </div>
  );

}
export { Asignacion };