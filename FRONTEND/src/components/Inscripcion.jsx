import  { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from './Tabla';
import Form from './Form';
import inscripcionService from '../services/inscripcion.service';

function Inscripcion(){
  const [inscriptions, setInscriptions] = useState([]);
  const [currentInscription, setCurrentInscription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fields = [
    { name: 'id_estudiante', label: 'Estudiante', type: 'select' },
    { name: 'id_curso', label: 'Curso', type: 'select' },
    { name: 'fecha_inscripcion', label: 'Fecha Inscripción', type: 'date' },
    { name: 'descripcion', label: 'Descripción', type: 'string' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await inscripcionService.getInscriptions();
    setInscriptions(data);
  };

  const handleDelete = async (id) => {
    const inscription = inscriptions.find((e) => e.id === id);
    if (inscription) {
      await inscripcionService.updateInscription(id, { ...inscription, activo: 0 });
      loadData();
    }
  };


  const handleEdit = (id) => {
    const inscription = inscriptions.find((i) => i.id === id);
    setCurrentInscription(inscription);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentInscription) {
      await inscripcionService.updateInscription(currentInscription.id, data);
    } else {
      await inscripcionService.createInscription(data);
    }
    setShowModal(false);
    setCurrentInscription(null)
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentInscription(null);
  };

  return (
    <div>
      <h1>Inscripciones</h1>

      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Inscripcion
      </Button>
      <Form
        fields={fields}
        initialData={currentInscription || {}}
        onSubmit={handleSubmit}
        componente={"Inscripcion"}
        isEditing={currentInscription !== null} 
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={inscriptions} onDelete={handleDelete} onEdit={handleEdit} componente="Inscripcion"/>
    </div>
  );
}

export  {Inscripcion};
