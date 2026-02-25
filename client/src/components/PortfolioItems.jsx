import { useState, memo } from "react";
import usePortfolioItems from "../hooks/usePortfolioItems";

//styles and animations
import {motion} from 'framer-motion';

const PortfolioItems = memo(({ handleMouseEnter, handleMouseLeave }) => {
  const [quantity, setQuantity] = useState(12);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");

  const { items, loading, error } = usePortfolioItems({
    quantity,
    category,
    tag,
  });

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label="Cargando proyectos">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div role="alert" aria-live="assertive">
        <p>Error al cargar los proyectos: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid-portfolio">
      {items.map((item) => {
        const backgroundImage = item.featured_image || "";

        return (
          <motion.div
            key={item.id}
            className="portfolio-item"
            onMouseEnter={() => handleMouseEnter(backgroundImage || "/logo.svg")}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
          >
            <h2>{item.title}</h2>
          </motion.div>
        );        
      })}
    </div>
  );
});

PortfolioItems.displayName = "PortfolioItems";

export default PortfolioItems;