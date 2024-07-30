import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Inicio } from "./components/Inicio";
import { Departamento } from "./components/Departamento.jsx";
import { Inscripcion } from "./components/Inscripcion.jsx";
import { Examen } from './components/Examen.jsx'
import { Calificacion } from './components/Calificacion.jsx'
import { Estudiante } from "./components/Estudiante.jsx";
import { Beca } from "./components/Beca.jsx";
import { Profesor } from "./components/Profesor";
import { Asignacion } from "./components/Asignacion";
import { Curso } from "./components/Curso.jsx";
import { EstudiantesBecados } from "./components/EstudianteBecado.jsx";
import "./App.css";


function App() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/departamentos" element={<Departamento />} />
            <Route path="/inscripciones" element={<Inscripcion />} />
            <Route path="/examenes" element={<Examen />} />
            <Route path="/calificaciones" element={<Calificacion />} />
            <Route path="/becas" element={<Beca />} />
            <Route path="/estudiantes" element={<Estudiante />} />
            <Route path="/profesores" element={<Profesor />} />
            <Route path="/asignaciones" element={<Asignacion />} />
            <Route path="/cursos" element={<Curso />} />
            <Route path="/estudiantesbecados" element={<EstudiantesBecados />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
