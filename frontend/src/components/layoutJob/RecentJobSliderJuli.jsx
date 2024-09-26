import React, { useEffect, useState, useRef } from 'react';

// hooks
import useFetchJuli from '../../hooks/useFetchJuli.js';

// components
import Slider from '../sliders/Slider';
import SliderFooter from './SliderFooter';

//styles
import '../../styles/components/sliders/recentJobSlider.css'

const RecentJobSliderJuli = ({ quantity = "4", order }) => {
  const { jobs, error } = useFetchJuli();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Convertir jobs a un array y aplicar el orden
  const jobEntries = Object.values(jobs || {}).flat();

  const recentJobsArray = jobEntries.slice(0, quantity);
  //a partir de aca no se usa mas el jonEntries, porque solo quiero la cantidad solicitada en la propiedad de este componente.
  

  // Ordenar según la propiedad 'order'
  const sortedJobs = recentJobsArray.sort((a, b) => {
    return order === 'asc' ? a.id - b.id : b.id - a.id; // Cambia 'id' por la propiedad que quieras usar para ordenar
  });

  // Cambiar el índice automáticamente
  useEffect(() => {
    // Función para actualizar el índice.
    const updateIndex = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (sortedJobs.length || 1));
    };

    // Crear el intervalo inicial.
    intervalRef.current = setInterval(updateIndex, 5000);

    // Limpieza del intervalo cuando el componente se desmonta o cambia el tamaño del array.
    return () => clearInterval(intervalRef.current);
  }, [sortedJobs.length]);

  const handleSelect = (index) => {
    setCurrentIndex(index); // Actualiza el índice al seleccionado.

    // Reinicia el intervalo al seleccionar manualmente.
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Limpia el intervalo actual.
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (sortedJobs.length || 1));
    }, 5000);
  };
  

  return (
    <section className='slider-container'>
      {sortedJobs.length > 0 && (
        <Slider
          key={sortedJobs[currentIndex].id}
          jobName={sortedJobs[currentIndex].name}
          workDone={sortedJobs[currentIndex].workDone}
          siteLink="false"
          siteCapture={sortedJobs[currentIndex].screenshot}
        />
      )}
      <div className="slide-selector-container">
        {sortedJobs.slice(0, quantity).map((proj, index) => (
          <SliderFooter
            key={proj.id}
            onClick={() => handleSelect(index)} // Actualiza el índice al hacer clic
            src={proj.logo}
            alt={proj.name}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentJobSliderJuli;
