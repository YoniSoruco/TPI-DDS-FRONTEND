import  { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import Table from './Tabla.jsx';
import Form from './Form.jsx';
import cursoService from '../services/cursos.service.js';

function Curso(){


  const [cursos, setCursos] = useState([]);
  const [currentCurso, setCurrentCurso] = useState(null);
  const [showModal, setShowModal] = useState(false);

const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'descripcion', label: 'Descripcion', type: 'text' },
    { name: 'fecha_inicio', label: 'Fecha Inicio', type: 'date' },
    { name: 'fecha_fin', label: 'Fecha Fin', type: 'date' }
  ]

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await cursoService.getCursos();
    setCursos(data);
  };

  const handleDelete = async (id) => {
    const curso = cursos.find((c) => c.id === id);
    if (curso) {
      await cursoService.updateCursos(id, {
        ...curso,
        activo: 0,
      });
      loadData();
    }
  };

  const handleEdit = (id) => {
    const curso = cursos.find((c) => c.id === id);
    setCurrentCurso(curso);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentCurso) {
      await cursoService.updateCursos(currentCurso.id, data);
    } else {
      await cursoService.createCursos(data);
    }
    setCurrentCurso(null);
    setShowModal(false);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCurso(null);
  };

  return (
    <div>
      <h1>Cursos</h1>

      
      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Curso
      </Button>

      <Form
        fields={fields}
        initialData={currentCurso || {}}
        onSubmit={handleSubmit}
        componente={"Curso"}
        isEditing={currentCurso !== null}
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={cursos} onDelete={handleDelete} onEdit={handleEdit} componente={"Curso"}/>
    </div>
  )
}



export  {Curso}