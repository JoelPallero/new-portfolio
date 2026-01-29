import { useState, useEffect } from 'react';

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const usePortfolioItems = ({ quantity, category, tag }) => {
  const [items, setItems] = useState([]); // Para almacenar los items
  const [loading, setLoading] = useState(true); // Para gestionar el estado de carga
  const [error, setError] = useState(null); // Para gestionar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base}json/portfolio.json`);
        let data = await response.json();

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
        setError("There was a problem loading more information.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quantity, category, tag]); // Dependencias: cambia cuando cambian quantity, category o tag

  return { items, loading, error };
};

export default usePortfolioItems;
