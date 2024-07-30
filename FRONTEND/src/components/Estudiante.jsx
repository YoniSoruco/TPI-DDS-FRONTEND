import  { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from './Tabla';
import Form from './Form';
import serviceEstudiante from '../services/estudiante.service.js';

function Estudiante(){
  const [estudiantes, setEstudiante] = useState([]);
  const [currentEstudiante, setCurrentEstudiante] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'apellido', label: 'Apellido', type: 'text' },
    { name: 'fecha_nacimiento', label: 'Fecha Nacimiento', type: 'date' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'telefono', label: 'Teléfono', type: 'text' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await serviceEstudiante.getEstudiantes();
    setEstudiante(data);
  };

  const handleDelete = async (id) => {
    const estudiante = estudiantes.find((e) => e.id === id);
    if (estudiante) {
      await serviceEstudiante.updateEstudiante(id, { ...estudiante, activo: 0 });
      loadData();
    }
  };

  const handleEdit = async (id) => {
    
    const estudiante = await estudiantes.find((i) => i.id === id);
    setCurrentEstudiante(estudiante);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentEstudiante) {
      await serviceEstudiante.updateEstudiante(currentEstudiante.id, data);
    } else {
      await serviceEstudiante.createEstudiante(data);
    }
setCurrentEstudiante(null);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEstudiante(null);
  };


  return (
    <div>
      <h1>Estudiantes</h1>
      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Estudiante
      </Button>
      <Form

        fields={fields}
        initialData={currentEstudiante || {}}
        onSubmit={handleSubmit}
        componente={"Estudiante"}
        isEditing={currentEstudiante !== null} 
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={estudiantes} onDelete={handleDelete} onEdit={handleEdit} componente={"Estudiante"}/>
    </div>
  );
}

export  { Estudiante };

