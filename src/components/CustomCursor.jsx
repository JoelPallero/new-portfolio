import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Importa motion de framer-motion

const CustomCursor = ({ icon }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Sumar window.scrollY a la posición y para tener en cuenta el desplazamiento de la página
      setMousePosition({
        x: event.clientX,
        y: event.clientY + window.scrollY, // Ajustamos la posición Y con el scroll
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "absolute",
        pointerEvents: "none",
        transform: "translate(30%, 30%)",
        zIndex: 99999,
      }}
      animate={{
        top: mousePosition.y,
        left: mousePosition.x,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      <img src={icon} alt="custom-cursor" />
    </motion.div>
  );
};

export default CustomCursor;
