import { useState, useEffect } from 'react';

// Hook personalizado para traer trabajos con orden y cantidad
const useFetchJobs = (quantity = null, order = 'desc') => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/jobs/jobs.json');

        if (!response.ok) {
          throw new Error('Error al cargar el archivo JSON');
        }

        const data = await response.json();

        // Convertir data a un array de trabajos
        const jobsArray = Object.values(data).flat();

        // Ordenar los datos según el parámetro 'order'
        let orderedData = jobsArray;

        if (order === 'asc') {
          orderedData = jobsArray.slice().sort((a, b) => a.id - b.id); // Ordenar por id ascendente
        } else if (order === 'desc') {
          orderedData = jobsArray.slice().sort((a, b) => b.id - a.id); // Ordenar por id descendente
        }

        // Filtrar según la cantidad solicitada
        if (quantity !== null) {
          setJobs(orderedData.slice(0, quantity));
        } else {
          setJobs(orderedData);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJobs();
  }, [quantity, order]); // Dependencias de 'quantity' y 'order'

  return { jobs, error };
};

export default useFetchJobs;
