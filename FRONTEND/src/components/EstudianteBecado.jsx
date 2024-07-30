import { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Table from './Tabla.jsx';
import Form from './Form.jsx';
import estudianteBecadoService from '../services/estudiantebecas.service.js';

function EstudiantesBecados() {


  const [estudiantesBecas, setEstudiantesBecas] = useState([]);
  const [currentEstudianteBecado, setCurrentEstudianteBeca] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fields = [
    { name: 'id_estudiante', label: 'Estudiante', type: 'select' },
    { name: 'id_beca', label: 'Beca', type: 'select' },
    { name: 'fecha_asignacion', label: 'Fecha Asignacion', type: 'date' }
  ]

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await estudianteBecadoService.getEstudiantesBecas();
    setEstudiantesBecas(data);
  };

  const handleDelete = async (id) => {
    const estudianteBeca = estudiantesBecas.find((d) => d.id === id);
    if (estudianteBeca) {
      await estudianteBecadoService.updateEstudianteBeca(id, {
        ...estudianteBeca,
        activo: 0,
      });
      loadData();
    }
  };
  const handleEdit = (id) => {
    const estudianteBeca = estudiantesBecas.find((b) => b.id === id);
    setCurrentEstudianteBeca(estudianteBeca);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentEstudianteBecado) {
      await estudianteBecadoService.updateEstudianteBeca(currentEstudianteBecado.id, data);
    } else {
      await estudianteBecadoService.createEstudianteBeca(data);
    }
    setCurrentEstudianteBeca(null);
    setShowModal(false);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEstudianteBeca(null);
  };

  return (
    <div>
      <h1>Estudiantes Becados</h1>
      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Estudiante-Beca
      </Button>
      <Form
        fields={fields}
        initialData={currentEstudianteBecado || {}}
        onSubmit={handleSubmit}
        componente={"EstudianteBecado"}
        isEditing={currentEstudianteBecado !== null}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={estudiantesBecas} onDelete={handleDelete} onEdit={handleEdit} componente={"EstudianteBecado"} />
    </div>
  )
}



export { EstudiantesBecados }