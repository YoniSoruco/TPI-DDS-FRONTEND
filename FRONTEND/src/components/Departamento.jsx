import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "./Tabla";
import Form from "./Form";
import departamentoService from "../services/departamento.service.js";

function Departamento() {
  const [departments, setDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fields = [
    { name: "nombre", label: "Nombre", type: "text" },
    { name: "ubicacion", label: "Ubicación", type: "text" },
    { name: "fecha_alta", label: "Fecha Alta", type: "date" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await departamentoService.getDepartments();
    setDepartments(data);
  };

  const handleDelete = async (id) => {
    const department = departments.find((d) => d.id === id);
    if (department) {
      await departamentoService.updateDepartment(id, {
        ...department,
        activo: 0,
      });
      loadData();
    }
  };

  const handleEdit = async (id) => {
    const department = departments.find((d) => d.id === id);
    setCurrentDepartment(department);
    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    if (currentDepartment) {
      await departamentoService.updateDepartment(currentDepartment.id, data);
    } else {
      const newDepartamento = { ...data, activo: 1 };
      await departamentoService.createDepartment(newDepartamento);
    }
    setCurrentDepartment(null);
    setShowModal(false);
    loadData();
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentDepartment(null);
  };

  return (
    <>
      <h1>Departamentos</h1>

      <Button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Agregar Departamento
      </Button>

      <Form
        fields={fields}
        initialData={currentDepartment || {}}
        onSubmit={handleSubmit}
        componente={"Departamento"}
        isEditing={currentDepartment !== null}
        showModal={showModal}
        closeModal={closeModal}
      />

      <Table
        data={departments}
        onDelete={handleDelete}
        onEdit={handleEdit}
        componente={"Departamento"}
      />
    </>
  );
}

export { Departamento };
