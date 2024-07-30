import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Table from "./Tabla.jsx";
import Form from "./Form.jsx";
import calificacionServices from "../services/calificaciones.service.js";

function Calificacion() {
  const [qualifications, setQualifications] = useState([]);
  const [currentQualification, setCurrentQualification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fields = [
    { name: "id_examen", label: "Examen", type: "select" },
    { name: "id_estudiante", label: "Estudiante", type: "select" },
    { name: "fecha_calificacion", label: "Fecha Calificacion", type: "date" },
    { name: "calificacion", label: "Calificacion", type: "float" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await calificacionServices.getQualifications();
    setQualifications(data);
  };

  const handleDelete = async (id) => {
    const qualification = qualifications.find((q) => q.id === id);
    if (qualification) {
      await calificacionServices.updateQualification(id, { ...qualification, activo: 0 });
      loadData();
    }
  };


  const handleEdit = (idCalificacion) => {
    const inscription = qualifications.find((i) => i.id === idCalificacion);
    setCurrentQualification(inscription);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentQualification) {
      await calificacionServices.updateQualification(
        currentQualification.id,
        data
      );
    } else {
      await calificacionServices.createQualification(data);
    }
    setShowModal(false);
    setCurrentQualification(null);
    loadData();
  };


  const closeModal = () => {
    setShowModal(false);
    setCurrentQualification(null);
  };
  return (
    <div>
      <h1>Calificaciones</h1>

      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Calificacion
      </Button>

      <Form
        fields={fields}
        initialData={currentQualification || {}}
        onSubmit={handleSubmit}
        componente={"Calificacion"}
        isEditing={currentQualification !== null}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={qualifications} onDelete={handleDelete} onEdit={handleEdit} componente='Calificacion'/>
    </div>
  );
}

export { Calificacion };
