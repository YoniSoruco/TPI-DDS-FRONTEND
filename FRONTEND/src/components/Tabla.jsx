import React, { useEffect, useState } from 'react';
import estudianteService from '../services/estudiante.service';
import cursoService from '../services/cursos.service';
import profesorService from '../services/profesor.service';
import becaService from '../services/beca.service';
import examenService from '../services/examen.service';
import departamentoService from '../services/departamento.service';

function Table({ data, onDelete, onEdit, componente }) {

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
      cursoService.getCursos()
    ]);

    setAdditionalData({
      students: studentData,
      courses: courseData
    });
  };

  const fetchExamenData = async () => {
    const courseData = await cursoService.getCursos();

    setAdditionalData({
      courses: courseData
    });
  };

  const fetchEstudianteBecadoData = async () => {
    const [studentData, becaData] = await Promise.all([
      estudianteService.getEstudiantes(),
      becaService.getBecas()
    ]);

    setAdditionalData({
      students: studentData,
      becas: becaData
    });
  };

  const fetchCalificacionData = async () => {
    const [studentData, examenData] = await Promise.all([
      estudianteService.getEstudiantes(),
      examenService.getExams()
    ]);

    setAdditionalData({
      students: studentData,
      exams: examenData
    });
  };

  const fetchAsignacionData = async () => {
    const [profesorData, courseData] = await Promise.all([
      profesorService.getProfessors(),
      cursoService.getCursos()
    ]);

    setAdditionalData({
      professors: profesorData,
      courses: courseData
    });
  };

  const fetchProfesorData = async () => {
    const departmentData = await departamentoService.getDepartments();

    setAdditionalData({
      departments: departmentData
    });
  };

  const getStudentName = (id) => {
    const student = additionalData.students?.find((student) => student.id === id);
    return student ? `${student.nombre}, ${student.apellido}` : 'N/A';
  };

  const getCourseName = (id) => {
    const course = additionalData.courses?.find((course) => course.id === id);
    return course ? course.nombre : 'N/A';
  };

  const getBecaName = (id) => {
    const beca = additionalData.becas?.find((beca) => beca.id === id);
    return beca ? beca.nombre : 'N/A';
  };

  const getExamenDescription = (id) => {
    const exam = additionalData.exams?.find((exam) => exam.id === id);
    return exam ? exam.descripcion : 'N/A';
  };

  const getProfesorName = (id) => {
    const profesor = additionalData.professors?.find((profesor) => profesor.id === id);
    return profesor ? `${profesor.nombre}, ${profesor.apellido}` : 'N/A';
  };

  const getDepartmentName = (id) => {
    const department = additionalData.departments?.find((department) => department.id === id);
    return department ? department.nombre : 'N/A';
  };


  const crearTh = () => {
    switch (componente) {
      case "Departamento":
        return (
          <tr>
            <th>Nombre Departamento</th>
            <th>Ubicacion</th>
            <th>Fecha Alta</th>
            <th>Acciones</th>
          </tr>
        );
      case "Inscripcion":
        return (
          <tr>
            <th>Estudiante</th>
            <th>Curso</th>
            <th>Fecha Inscripcion</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        );

      case "Examen":
        return (
          <tr>
            <th>Curso</th>
            <th>Descripcion</th>
            <th>Fecha Examen</th>
            <th>Duracion</th>
            <th>Acciones</th>
          </tr>
        );
      case "Calificacion":
        return (
          <tr>
            <th>Estudiante</th>
            <th>Examen</th>
            <th>Fecha Calificacion</th>
            <th>Calificacion</th>
            <th>Acciones</th>
          </tr>
        );
      case "Beca":
        return (
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Monto</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        );
      case "Estudiante":
        return (
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha nacimiento</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        );
      case "Asignacion":
        return (
          <tr>
            <th>Profesor</th>
            <th>Curso</th>
            <th>Fecha Asignacion</th>
            <th>Acciones</th>
          </tr>
        );

      case "Profesor":
        return (
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Contratacion</th>
            <th>Departamento</th>
            <th>Salario</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        );
      case "Curso":
        return (
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        );
      case "EstudianteBecado":
        return (
          <tr>
            <th>Estudiante</th>
            <th>Beca</th>
            <th>Fecha Asignacion</th>
            <th>Acciones</th>
          </tr>
        );
      // Puedes agregar más casos aquí para otros componentes
      default:
        return null;
    }
  };

  const crearTd = (item) => {
    switch (componente) {
      case "Departamento":
        return (
          <>
            <td>{item.nombre}</td>
            <td>{item.ubicacion}</td>
            <td>{item.fecha_alta}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );
      case "Examen":
        return (
          <>
            <td>{getCourseName(item.id_curso)}</td>
            <td>{item.descripcion}</td>
            <td>{item.fecha_examen}</td>
            <td>{item.duracion}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID del examen
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );
      case "Inscripcion":
        return (
          <>
             <td>{getStudentName(item.id_estudiante)}</td>
             <td>{getCourseName(item.id_curso)}</td>
            <td>{item.fecha_inscripcion}</td>
            <td>{item.descripcion}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID de la inscripción
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );
      case "Calificacion":
        return (
          <>
            
            <td>{getStudentName(item.id_estudiante)}</td>
            <td>{getExamenDescription(item.id_examen)}</td>
            <td>{item.fecha_calificacion}</td>
            <td>{item.calificacion}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID de la calificación
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );

      case "Beca":
        return (
          <>
            <td>{item.nombre}</td>
            <td>{item.descripcion}</td>
            <td>{item.monto}</td>
            <td>{item.fecha_inicio}</td>
            <td>{item.fecha_fin}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID de la beca
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );
      case "Estudiante":
        return (
          <>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.fecha_nacimiento}</td>
            <td>{item.email}</td>
            <td>{item.telefono}</td>
            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID del estudiante
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );
      case "Asignacion":
        return (
          <>
            <td>{getProfesorName(item.id_profesor)}</td>
            <td>{getCourseName(item.id_curso)}</td>
            <td>{item.fecha_asignacion}</td>

            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID del estudiante
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );

      case "Profesor":
        return (
          <>
            <td>{item.nombre}</td>
            <td>{item.apellido}</td>
            <td>{item.fecha_contratacion}</td>
            <td>{getDepartmentName(item.id_departamento)}</td>
            <td>{item.salario}</td>
            <td>{item.telefono}</td>

            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID del estudiante
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );
      case "Curso":
        return (
          <>
            <td>{item.nombre}</td>
            <td>{item.descripcion}</td>
            <td>{item.fecha_inicio}</td>
            <td>{item.fecha_fin}</td>

            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID del estudiante
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );

      case "EstudianteBecado":
        return (
          <>
            <td>{getStudentName(item.id_estudiante)}</td>
            <td>{getBecaName(item.id_beca)}</td>
            <td>{item.fecha_asignacion}</td>

            <td>
              <button
                className="btn btn-warning"
                onClick={() => onEdit(item.id)} // Llama a la función onEdit con el ID del estudiante
              >
                Editar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmarEliminar(item.id)} // Cambio aquí para llamar a confirmarEliminar
              >
                Eliminar
              </button>
            </td>
          </>
        );

      // Puedes agregar más casos aquí para otros componentes
      default:
        return null;
    }
  };

  const confirmarEliminar = (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este elemento?')) {
      onDelete(id);
    }
  };

  return (
    <table className="table">
      <thead>{crearTh()}</thead>
      <tbody>
        {data
          .filter((item) => item.activo === 1)
          .map((item, index) => (
            <tr key={index}>{crearTd(item)}</tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
