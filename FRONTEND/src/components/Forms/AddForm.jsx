import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Form as BootstrapForm } from "react-bootstrap";

function AddForm({
  fields,
  onSubmit,
  componente,
  closeModal,
  additionalData,
}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{`Agregar Nuevo ${componente}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapForm onSubmit={handleSubmit(handleFormSubmit)}>
          {fields.map((field) => (
            <div className="mb-3" key={field.name}>
              <BootstrapForm.Label>{field.label}</BootstrapForm.Label>
              {field.type === "select" ? (
                <BootstrapForm.Control
                  as="select"
                  className="form-select"
                  {...register(field.name, { required: true })}
                >
                  <option value="">Seleccione...</option>
                  {field.name === "id_estudiante" &&
                    additionalData.students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.nombre}, {student.apellido}
                      </option>
                    ))}
                  {field.name === "id_curso" &&
                    additionalData.courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.nombre}
                      </option>
                    ))}
                    {field.name === "id_departamento" &&
                    additionalData.departments.map((departament) => (
                      <option key={departament.id} value={departament.id}>
                        {departament.nombre}
                      </option>
                    ))}
                    {field.name === "id_profesor" &&
                    additionalData.professors.map((professor) => (
                      <option key={professor.id} value={professor.id}>
                        {professor.nombre}, {professor.apellido}
                      </option>
                    ))}
                    {field.name === "id_examen" &&
                    additionalData.exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.descripcion}
                      </option>
                    ))}
                    {field.name === "id_beca" &&
                    additionalData.becas.map((beca) => (
                      <option key={beca.id} value={beca.id}>
                        {beca.nombre}
                      </option>
                    ))}
                </BootstrapForm.Control>
              ) : (
                <BootstrapForm.Control
                  {...register(field.name, { required: true })}
                  type={field.type}
                />
              )}
              {errors[field.name] && (
                <p className="text-danger">Este campo es obligatorio</p>
              )}
            </div>
          ))}
          <Button variant="primary" type="submit">
            Agregar
          </Button>
        </BootstrapForm>
      </Modal.Body>
    </>
  );
}

export default AddForm;
