import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import EditForm from "./Forms/EditForm";
import AddForm from "./Forms/AddForm";
import estudianteService from "../services/estudiante.service";
import cursoService from "../services/cursos.service";
import becaService from "../services/beca.service";
import examenService from "../services/examen.service";
import profesorService from "../services/profesor.service";
import departamentoService from "../services/departamento.service";

function Form({
  fields,
  initialData,
  onSubmit,
  componente,
  isEditing,
  showModal,
  closeModal,
}) {
  const [additionalData, setAdditionalData] = useState({});

  useEffect(() => {
    if (componente === "Inscripcion") {
      fetchInscripcionData();
    } else if (componente === "Examen") {
      fetchExamenData();
    } else if (componente === "EstudianteBecado") {
      fetchEstudianteBecadoData();
    } else if (componente === "Calificacion") {
      fetchCalificacionData();
    } else if (componente === "Asignacion") {
      fetchAsignacionData();
    } else if (componente === "Profesor") {
      fetchProfesorData();
    }
  }, [componente]);

  const fetchInscripcionData = async () => {
    const [studentData, courseData] = await Promise.all([
      estudianteService.getEstudiantes(),
      cursoService.getCursos(),
    ]);

    setAdditionalData({
      students: studentData,
      courses: courseData,
    });
  };

  const fetchExamenData = async () => {
    const courseData = await cursoService.getCursos();

    setAdditionalData({
      courses: courseData,
    });
  };

  const fetchEstudianteBecadoData = async () => {
    const [studentData, becaData] = await Promise.all([
      estudianteService.getEstudiantes(),
      becaService.getBecas(),
    ]);

    setAdditionalData({
      students: studentData,
      becas: becaData,
    });
  };

  const fetchCalificacionData = async () => {
    const [studentData, examenData] = await Promise.all([
      estudianteService.getEstudiantes(),
      examenService.getExams(),
    ]);

    setAdditionalData({
      students: studentData,
      exams: examenData,
    });
  };

  const fetchAsignacionData = async () => {
    const [profesorData, courseData] = await Promise.all([
      profesorService.getProfessors(),
      cursoService.getCursos(),
    ]);

    setAdditionalData({
      professors: profesorData,
      courses: courseData,
    });
  };

  const fetchProfesorData = async () => {
    const departmentData = await departamentoService.getDepartments();

    setAdditionalData({
      departments: departmentData,
    });
  };

  return (
    
    <Modal show={showModal} onHide={closeModal}>
      {isEditing ? (
        <EditForm
          fields={fields}
          initialData={initialData}
          onSubmit={onSubmit}
          componente={componente}
          closeModal={closeModal}
          additionalData={additionalData}
        />
      ) : (
        <AddForm
          fields={fields}
          onSubmit={onSubmit}
          componente={componente}
          closeModal={closeModal}
          additionalData={additionalData}
        />
      )}
    </Modal>
  );
}

export default Form;