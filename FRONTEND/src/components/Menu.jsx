import { NavLink } from "react-router-dom"
function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand">
        <i className="fa fa-industry"></i>
        &nbsp;<i>TPI - FRONTEND</i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/inscripciones">
              Inscripciones
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link" to="/departamentos">
              Departamentos
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink className="nav-link" to="/cursos">
              Cursos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/estudiantesbecados">
              Estudiantes Becados
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/examenes">
              Examenes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/calificaciones">
              Calificaciones
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/becas">
              Becas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/estudiantes">
              Estudiantes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profesores">
              Profesor
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/asignaciones">
             Asignacion
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  )
}
export { Menu }
