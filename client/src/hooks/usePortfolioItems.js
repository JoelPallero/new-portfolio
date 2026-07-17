import { useState, useEffect } from 'react';

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

let portfolioCache = null;

const usePortfolioItems = ({ quantity, category, tag }) => {
  const [items, setItems] = useState([]); // Para almacenar los items
  const [loading, setLoading] = useState(true); // Para gestionar el estado de carga
  const [error, setError] = useState(null); // Para gestionar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!portfolioCache) {
          portfolioCache = fetch(`${base}json/portfolio.json`).then(res => res.json());
        }
        let data = await portfolioCache;

        // Ignorar clientes sin URL de imagen (featured_image vacío o inexistente)
        data = data.filter(
          (item) => item.featured_image != null && String(item.featured_image).trim() !== ""
        );

        // Filtramos por categoría si se especifica
        if (category) {
          data = data.filter((item) => item.categories && item.categories.includes(category));
        }

        // Filtramos por etiqueta si se especifica
        if (tag) {
          data = data.filter((item) => item.tags && item.tags.includes(tag));
        }

        // Orden "del último hacia atrás": tomamos los últimos N y los mostramos con el último primero
        if (quantity) {
          data = [...data.slice(-quantity)].reverse();
        } else {
          data = [...data].reverse();
        }

        setItems(data);
      } catch (err) {
        console.error("Error loading portfolio items:", err);
        setError("Hubo un problema al cargar la información del portafolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quantity, category, tag]); // Dependencias: cambia cuando cambian quantity, category o tag

  return { items, loading, error };
};

export default usePortfolioItems;
