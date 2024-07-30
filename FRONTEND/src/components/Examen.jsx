import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import Table from "./Tabla.jsx";
import Form from "./Form.jsx";
import  examenServices from "../services/examen.service.js"

function Examen() {
  const [exams, setExam] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fields = [
    { name: "id_curso", label: "Curso", type: "select" },
    { name: "descripcion", label: "Descripcion", type: "text" },
    { name: "fecha_examen", label: "Fecha Examen", type: "date"},
    { name: "duracion", label: "Duracion", type: "float" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await examenServices.getExams();
    setExam(data);
  };

  const handleDelete = async (id) => {
    const exam = exams.find((e) => e.id === id);
    if (exam) {
      await examenServices.updateExam(id, { ...exam, activo: 0 });
      loadData();
    }
  };
 

  const handleEdit = (idExamen) => {
    const department = exams.find((i) => i.id === idExamen);
    setCurrentExam(department);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentExam) {
      await examenServices.updateExam(currentExam.id, data);
    } else {
      await examenServices.createExam(data);
    }
    setShowModal(false);
    setCurrentExam(null);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentExam(null);
  };

  return (
    <>
      <h1>Examenes</h1>
      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Examen
      </Button>
      <Form
        fields={fields}
        initialData={currentExam || {}}
        onSubmit={handleSubmit}
        componente={"Examen"}
        isEditing={currentExam !== null} 
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={exams} onDelete={handleDelete} onEdit={handleEdit} componente="Examen"/>
    </>
  );
}

export { Examen };
