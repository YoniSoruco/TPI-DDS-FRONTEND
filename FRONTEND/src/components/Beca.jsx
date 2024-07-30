import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from './Tabla';
import Form from './Form';
import becaServices from '../services/beca.service.js';

function Beca() {
  const [becas, setBecas] = useState([]);
  const [currentBeca, setCurrentBeca] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'descripcion', label: 'Descripción', type: 'text' },
    { name: 'monto', label: 'Monto', type: 'text' },
    { name: 'fecha_inicio', label: 'Fecha Inicio', type: 'date' },
    { name: 'fecha_fin', label: 'Fecha Fin', type: 'date' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await becaServices.getBecas();
    setBecas(data);
  };

  const handleDelete = async (id) => {
    const beca = becas.find((b) => b.id === id);
    if (beca) {
      await becaServices.updateBeca(id, { ...beca, activo: 0 });
      loadData();
    }
  };

  const handleEdit = (id) => {
    const beca = becas.find((b) => b.id === id);
    setCurrentBeca(beca);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentBeca) {
      await becaServices.updateBeca(currentBeca.id, data);
    } else {
      await becaServices.createBeca(data);
    }
    setShowModal(false);
    setCurrentBeca(null);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentBeca(null);
  };

  return (
    <>
      <h1>Becas</h1>

      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Beca
      </Button>

      <Form
        fields={fields}
        initialData={currentBeca || {}}
        onSubmit={handleSubmit}
        componente={"Beca"}
        isEditing={currentBeca !== null}
        showModal={showModal}
        closeModal={closeModal}
      />

      <Table
        data={becas}
        onDelete={handleDelete}
        onEdit={handleEdit}
        componente={"Beca"}
      />
    </>
  );
}

export { Beca };