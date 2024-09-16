import React from 'react';

//Hooks
import useFormFields from '../hooks/useFormFields';

//Dynamic forms
import { formConfigs } from '../formConfigs';

//Styles
import '../styles/dynamicForms.css'

const DynamicForm = ({ formType }) => {
  const { formFields, handleInputChange } = useFormFields(formConfigs[formType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields); // Aquí procesas los datos del formulario
  };

  return (
    <form className="dynamic-forms" onSubmit={handleSubmit}>
      {Object.keys(formFields).map((field) => {
        const { label, type, value, disabled, options, accept, capture, maxLength } = formFields[field];

        return (
          <div className="form-block-container" key={field}>
            <label>{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={field}
                value={value}
                disabled={disabled}
                maxLength={maxLength} // Limita el número de caracteres en descripciones
                onChange={handleInputChange}
              />
            ) : type === 'select' ? (
              <select
                name={field}
                value={value}
                onChange={handleInputChange}
                multiple={Array.isArray(value)} // Permite selección múltiple si el campo lo requiere
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : type === 'file' ? (
              <input
                type={type}
                name={field}
                disabled={disabled}
                accept={accept}
                capture={capture}
                onChange={handleInputChange}
              />
            ) : (
              <input
                type={type}
                name={field}
                value={value}
                disabled={disabled}
                accept={accept}
                capture={capture}
                onChange={handleInputChange}
              />
            )}
          </div>
        );
      })}
      <button type="submit">
        {formType === 'altaHerramientas'
          ? 'Agregar Herramienta'
          : formType === 'altaTrabajos'
          ? 'Crear Nuevo Trabajo'
          : formType === 'contacto'
          ? 'Enviar Mensaje'
          : formType === 'resetPassword'
          ? 'Restablecer Clave'
          : 'Enviar'}
      </button>
    </form>
  );
};

export default DynamicForm;
