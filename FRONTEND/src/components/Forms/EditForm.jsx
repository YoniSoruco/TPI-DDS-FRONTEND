import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Form as BootstrapForm } from "react-bootstrap";

function EditForm({
  fields,
  initialData,
  onSubmit,
  componente,
  closeModal,
  additionalData,
}) {
  const { register, control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Cuando los datos adicionales o los datos iniciales cambian,
    // se actualiza el valor seleccionado en el control del formulario.
    if (componente === "Inscripcion") {
        setValue("id_estudiante", initialData.id_estudiante);
        setValue("id_curso", initialData.id_curso);
      } else if (componente === "Examen") {
        setValue("id_curso", initialData.id_curso);
      } else if (componente === "EstudianteBecado") {
        setValue("id_estudiante", initialData.id_estudiante);
        setValue("id_beca", initialData.id_beca);
      } else if (componente === "Calificacion") {
        setValue("id_examen", initialData.id_examen);
        setValue("id_estudiante", initialData.id_estudiante);
      } else if (componente === "Asignacion") {
        setValue("id_profesor", initialData.id_estudiante);
        setValue("id_curso", initialData.id_curso);
      } else if (componente === "Profesor") {
        setValue("id_departamento", initialData.id_departamento);
      }

  }, [initialData, setValue]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{`Editar ${componente}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <BootstrapForm onSubmit={handleSubmit(handleFormSubmit)}>
          {fields.map((field) => (
            <div className="mb-3" key={field.name}>
              <BootstrapForm.Label>{field.label}</BootstrapForm.Label>
              {field.type === "select" && (
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={initialData[field.name]}
                  render={({ field }) => (
                    <BootstrapForm.Control
                      {...field}
                      as="select"
                      className="form-select"
                    >
                      {field.name === "id_estudiante" &&
                        additionalData.students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.nombre} {student.apellido}
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
                  )}
                />
              )}
              {field.type !== "select" && (
                <BootstrapForm.Control
                  {...register(field.name)}
                  type={field.type}
                  defaultValue={initialData[field.name] || ""}
                />
              )}
            </div>
          ))}
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </BootstrapForm>
      </Modal.Body>
    </>
  );
}

export default EditForm;
