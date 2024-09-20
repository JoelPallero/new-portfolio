import React from 'react';

// Jobs hook
import useFetchJobs from '../../../hooks/useFetchJobs';

const RecentJobSlider = ({ quantity, order }) => {
  const { jobs, error } = useFetchJobs(); // Llamamos al hook sin argumentos para traer todos los trabajos

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Asegúrate de que `jobs` es un objeto con las claves esperadas
  const jobEntries = Object.values(jobs || {}).flat(); // Convierte el objeto en un array de trabajos

  return (
    <div>
      {jobEntries.slice(0, quantity).map((project, index) => (
        <div key={project.id} className='slider-container'>
          <header className="header-slider">
            <div className="left-container">
              <div className="title-job-slider">
                <h3>{project.name}</h3>
                <p>Hola {project.name}</p>
              </div>
              <div className="work-done-slider">
                <h3>{project.workDone}</h3>
                <p>Hola {project.workDone}</p>
              </div>
              <div className="link-job-slider">
                <a href={project.website} target="_blank" rel="noopener noreferrer">Go to</a>
              </div>
            </div>
            <div className="right-container">
              <img src={project.screenshot} alt={project.name} />
            </div>
          </header>
          <footer className="footer-slider">
            {jobEntries.slice(0, quantity).map((proj) => (
              <div key={proj.id} className="slider-selector" onClick={() => handleSelect(proj.id)}>
                <img src={proj.logo} alt={`${proj.name} logo`} />
              </div>
            ))}
          </footer>
        </div>
      ))}
    </div>
  );
};

export default RecentJobSlider;

/*

Crear 1 componente que tenga toda la estructura del slide, y que reciba como propiedades, cada campo del trabajo que quiera mostrar, como el nombre, las herramientas utilizadas, la imagen, el logo, y textos.
Utilizar el hook que llama los datos, y los guarda en un array. en cada posición del array, guardo el objeto. El objeto sería cada uno de los trabajos con todos sus datos completos traidos desde el json.
Luego utilizar un hook con useEffect y useState para que cada determinado tiempo, el componente slider, cambie sus datos, pasándole los datos de ls siguiente posición del array.
Por otro lado, tener un contenedor con otro componente que reciba: id (del array con el objeto), y logo de ese objeto. Es decir, que si tengo 4 objetos, serían los id (del array): 0,1,2,3. Por lo que este último contenedor, tendría 4 compoentes iguales, con diferentes id, y logo. El slider va a funcionar normalmente, pero cada vez que haga click en uno de estos componentes que tiene un id del array, va a hacer que el slider muestre toda la info que hay en esa posición del array. Pero el slider va a correct con tiempo y todo normal, como si el cambio hubiera sido automático.


1. Componente Estructural del Slider
Crear un componente que contenga la estructura del slider y reciba propiedades como nombre, herramientas, imagen, logo y textos es una buena práctica de separación de responsabilidades. Esto asegura que el componente se mantenga modular y reutilizable.
2. Uso de un Hook para Obtener Datos
Utilizar un hook para obtener los datos y almacenarlos en un array es una forma eficiente de manejar la carga inicial de la información. Cada posición del array representará un objeto con todos los datos de un trabajo específico, lo cual es adecuado y simplifica el acceso a los datos.
3. Cambio de Contenido con useEffect y useState
Usar useEffect para manejar el intervalo de tiempo en el que el slider cambia de contenido es perfecto. Esto te permitirá implementar la funcionalidad de auto-play de manera controlada.
useState será útil para mantener el índice actual del slider y actualizarlo conforme cambie el contenido automáticamente.
4. Control Manual del Slider con Ítems del Contenedor
Tu idea de tener un contenedor adicional con componentes que representen cada ítem del slider (utilizando id y logo) es excelente para permitir al usuario interactuar manualmente. Al hacer clic en uno de estos ítems, actualizarías el estado del índice del slider, mostrando el contenido correspondiente en el slider principal.
5. Integración de Control Manual y Automático
El punto más interesante de tu propuesta es que combinás la funcionalidad automática con la manual:
Automático: el slider cambia automáticamente cada cierto tiempo usando el setInterval dentro del useEffect.
Manual: cuando se hace clic en un ítem, se actualiza el índice del slider, y la funcionalidad automática se sincroniza sin problemas.
6. Consideraciones Adicionales
Pausa y Reanudar: Si se hace clic en un ítem, tal vez quieras pausar el setInterval temporalmente y reanudarlo después de un tiempo, para evitar conflictos entre la acción manual y automática.
Optimización: Considerar limpiar el setInterval dentro del useEffect para evitar múltiples llamadas cuando se cambian las propiedades o se monta/desmonta el componente.
Accesibilidad: Asegúrate de que el componente sea accesible, permitiendo el control con teclado y proporcionando descripciones adecuadas para lectores de pantalla.
7. Flexibilidad y Escalabilidad
La forma en que planeás gestionar la estructura de datos es flexible y te permitirá agregar más trabajos sin modificar la lógica del slider.
Este patrón es escalable y lo podés reutilizar en otros contextos donde necesites manejar listados dinámicos con control manual y automático.
8. Posibles Mejoras
Animaciones: Podrías agregar transiciones suaves cuando cambian los slides para mejorar la experiencia visual.
Indicación Visual: Resaltar visualmente el ítem actual en el contenedor secundario para que el usuario sepa cuál está activo en el slider.
Resiliencia: Asegurarte de que el componente maneje correctamente casos como un array vacío o datos faltantes.



*/