import { useState, useEffect } from 'react';
import PortfolioItems from '../json/portfolio.json'; // Importar el archivo JSON local

const usePortfolioItems = ({ quantity, category, tag }) => {
  const [items, setItems] = useState([]); // Para almacenar los items
  const [loading, setLoading] = useState(true); // Para gestionar el estado de carga
  const [error, setError] = useState(null); // Para gestionar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = PortfolioItems;

        // Filtramos por categoría si se especifica
        if (category) {
          data = data.filter(item => item.categories.includes(category));
        }

        // Filtramos por etiqueta si se especifica
        if (tag) {
          data = data.filter(item => item.tags.includes(tag));
        }

        // Filtramos por cantidad si se especifica
        if (quantity) {
          data = data.slice(0, quantity); // Tomamos solo los primeros "quantity" elementos
        }

        // Si no hay categoría ni etiqueta, simplemente traemos todos los elementos disponibles
        setItems(data);
      } catch (err) {
        setError("Hubo un problema al cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quantity, category, tag]); // Dependencias: cambia cuando cambian quantity, category o tag

  return { items, loading, error };
};

export default usePortfolioItems;
