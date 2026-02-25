import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./portfolio-accordion.css";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const PortfolioAccordion = memo(({ category, quantity }) => {
  const [clientsData, setClientsData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const timeoutRefs = useRef({});
  const isAnimatingRefs = useRef({});
  const isExpandedRefs = useRef({});
  const lastExpandedIndexRef = useRef(null);

  // Cargar datos desde portfolio.json
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const response = await fetch(`${base}json/portfolio.json`);
        const portfolioData = await response.json();
        
        // Filtrar items que tengan título (eliminar vacíos)
        let filteredData = portfolioData.filter(item => item.title && item.title.trim() !== "");
        
        // Filtrar por categoría si se especifica
        if (category) {
          filteredData = filteredData.filter(item => 
            item.categories && item.categories.includes(category)
          );
        }
        
        // Tomar desde el último hacia atrás: los últimos N según quantity
        if (quantity) {
          filteredData = [...filteredData.slice(-quantity)].reverse();
        }
        
        // Transformar datos al formato esperado por el componente
        const transformedData = filteredData.map(item => ({
          id: item.id,
          name: item.title,
          gallery: item.gallery && item.gallery.length > 0 
            ? item.gallery 
            : (item.featured_image ? [item.featured_image] : []),
          url: item.url || "",
          categories: item.categories || [],
          long_description: item.long_description || ""
        }));
        
        setClientsData(transformedData);
        
        // Inicializar índices de imagen para cada cliente
        const initialIndices = {};
        transformedData.forEach((_, index) => {
          initialIndices[index] = 0;
        });
        setCurrentImageIndices(initialIndices);
        
        // Abrir la última solapa por defecto después de que los datos estén cargados
        if (transformedData.length > 0) {
          const lastIndex = transformedData.length - 1;
          // Usar setTimeout para asegurar que el estado se actualice correctamente
          setTimeout(() => {
            setExpandedIndex(lastIndex);
            isExpandedRefs.current[lastIndex] = true;
            lastExpandedIndexRef.current = lastIndex;
          }, 0);
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      }
    };

    loadPortfolioData();
  }, [category, quantity]);

  // Actualizar refs cuando cambia expandedIndex
  useEffect(() => {
    if (expandedIndex !== null) {
      isExpandedRefs.current[expandedIndex] = true;
    }
  }, [expandedIndex]);

  // Slide automático cuando hay un item expandido
  useEffect(() => {
    if (expandedIndex === null) return;
    if (clientsData.length === 0) return; // Esperar a que los datos estén cargados
    
    const clientData = clientsData[expandedIndex];
    if (!clientData || !clientData.gallery || clientData.gallery.length <= 1) return;

    // Asegurar que el ref esté actualizado
    isExpandedRefs.current[expandedIndex] = true;

    // Limpiar timeout anterior si existe
    if (timeoutRefs.current[expandedIndex]) {
      clearTimeout(timeoutRefs.current[expandedIndex]);
      timeoutRefs.current[expandedIndex] = null;
    }

    // Función recursiva para el slider automático infinito
    const startSlider = () => {
      if (!isExpandedRefs.current[expandedIndex] || !clientData || clientData.gallery.length <= 1) {
        isAnimatingRefs.current[expandedIndex] = false;
        return;
      }

      isAnimatingRefs.current[expandedIndex] = true;
      
      timeoutRefs.current[expandedIndex] = setTimeout(() => {
        if (!isExpandedRefs.current[expandedIndex] || !clientData || clientData.gallery.length <= 1) {
          isAnimatingRefs.current[expandedIndex] = false;
          return;
        }

        // Actualizar el índice con loop infinito
        setCurrentImageIndices((prev) => ({
          ...prev,
          [expandedIndex]: (prev[expandedIndex] + 1) % clientData.gallery.length
        }));

        // Continuar el slider infinitamente si aún está expandido
        if (isExpandedRefs.current[expandedIndex]) {
          startSlider();
        } else {
          isAnimatingRefs.current[expandedIndex] = false;
        }
      }, 2000); // Cada slide dura 2 segundos
    };

    // Iniciar el slider con un pequeño delay para asegurar que todo esté listo
    const initTimeout = setTimeout(() => {
      startSlider();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
      if (timeoutRefs.current[expandedIndex]) {
        clearTimeout(timeoutRefs.current[expandedIndex]);
        timeoutRefs.current[expandedIndex] = null;
      }
      isAnimatingRefs.current[expandedIndex] = false;
    };
  }, [expandedIndex, clientsData]);

  // Resetear índices de imágenes cuando cambia el acordeón expandido
  useEffect(() => {
    // Limpiar timeouts de los acordeones que no están expandidos
    Object.keys(timeoutRefs.current).forEach(key => {
      const keyIndex = parseInt(key);
      if (keyIndex !== expandedIndex && timeoutRefs.current[key]) {
        clearTimeout(timeoutRefs.current[key]);
        timeoutRefs.current[key] = null;
      }
    });
    
    // Resetear índices de imágenes de los acordeones cerrados
    if (expandedIndex !== null && clientsData.length > 0) {
      setCurrentImageIndices((prev) => {
        const resetIndices = { ...prev };
        clientsData.forEach((_, index) => {
          if (index !== expandedIndex) {
            resetIndices[index] = 0;
          }
        });
        return resetIndices;
      });
    }
  }, [expandedIndex, clientsData.length]);

  // Handler para toggle con click
  const handleToggle = useCallback((index) => {
    // No permitir cerrar si es el último abierto (siempre debe haber uno abierto)
    if (expandedIndex === index) {
      // Si hay más de un item, no permitir cerrar el último
      if (clientsData.length > 1) {
        return; // No hacer nada, siempre debe haber uno abierto
      }
    } else {
      // Mover la solapa clickeada al final y abrirla ahí
      const clickedClient = clientsData[index];
      const otherClients = clientsData.filter((_, i) => i !== index);
      const reorderedClients = [...otherClients, clickedClient];
      
      // El nuevo índice expandido será el último (length - 1)
      const newExpandedIndex = reorderedClients.length - 1;
      
      // Actualizar los índices de imágenes manteniendo el índice del cliente clickeado
      setCurrentImageIndices((prev) => {
        const newIndices = {};
        const clickedImageIndex = prev[index] || 0;
        
        // Mapear los índices antiguos a los nuevos
        otherClients.forEach((_, oldIndex) => {
          const originalIndex = oldIndex < index ? oldIndex : oldIndex + 1;
          newIndices[oldIndex] = prev[originalIndex] || 0;
        });
        
        // El cliente clickeado va al final
        newIndices[newExpandedIndex] = clickedImageIndex;
        
        return newIndices;
      });
      
      // Actualizar el array de clientes y el índice expandido de forma sincronizada
      setClientsData(reorderedClients);
      setExpandedIndex(newExpandedIndex);
      isExpandedRefs.current[newExpandedIndex] = true;
      lastExpandedIndexRef.current = newExpandedIndex;
    }
  }, [expandedIndex, clientsData]);

  if (!clientsData || clientsData.length === 0) {
    return null;
  }

  // Función para obtener la ruta de la imagen
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    
    // Si ya es una ruta completa o relativa que empieza con http o /
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // Si empieza con ./assets, quitar el ./
    if (imagePath.startsWith('./assets')) {
      return `${base}${imagePath.substring(2)}`;
    }
    
    // Si solo es el nombre del archivo, asumir que está en portfolioImg
    if (!imagePath.includes('/')) {
      return `${base}assets/portfolioImg/${imagePath}`;
    }
    
    // Ruta relativa normal
    return `${base}${imagePath}`;
  };

  return (
    <div className="branding-accordion-container">
      {clientsData.map((clientData, index) => {
        const isExpanded = expandedIndex === index;
        const currentImageIndex = currentImageIndices[index] || 0;
        const firstImage = clientData.gallery && clientData.gallery.length > 0
          ? getImagePath(clientData.gallery[0])
          : null;
        const currentImage = clientData.gallery && clientData.gallery.length > 0
          ? getImagePath(clientData.gallery[currentImageIndex])
          : null;

        return (
          <motion.div
            key={clientData.id || `client-${clientData.name}-${index}`}
            layout
            className={`branding-accordion-item ${isExpanded ? "expanded" : ""}`}
            onClick={() => handleToggle(index)}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? "Cerrar" : "Abrir"} proyecto ${clientData.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle(index);
              }
            }}
            transition={{
              layout: {
                type: "spring",
                stiffness: 500,
                damping: 40
              }
            }}
          >
            {!isExpanded ? (
              /* Panel cerrado - 100px de ancho */
              <div className="branding-accordion-closed">
                {/* Sticky amarillo animado - solo en hover */}
                <div className="branding-accordion-sticky" />
                {/* Flecha SVG - solo visible en hover cuando está cerrado */}
                <div className="branding-accordion-arrow">
                  <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                    <path d="m.5 8.5 4-4-4-4" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" transform="translate(9 6)"/>
                  </svg>
                </div>
                <div className="branding-accordion-name">
                  <span>{clientData.name}</span>
                </div>
              </div>
            ) : (
              /* Cuando está expandido: slider + info abajo, panel a la izquierda */
              <div className="branding-accordion-expanded-wrapper">
                <div className="branding-accordion-expanded-main">
                  {/* Galería */}
                  {clientData.gallery && clientData.gallery.length > 0 && (
                    <motion.div
                      className="branding-accordion-expanded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="branding-accordion-gallery">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: 1,
                              transition: { duration: 0.2, ease: "easeIn" }
                            }}
                            exit={{ 
                              opacity: 0,
                              transition: { duration: 0.1, ease: "easeOut" }
                            }}
                            className="branding-accordion-gallery-image"
                            style={{
                              backgroundImage: `url(${currentImage || firstImage})`
                            }}
                          />
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                  {/* Info: 1 fila = pastillas + tarjeta de texto (blur solo en texto) */}
                  <div className="branding-accordion-info">
                    {(clientData.categories?.length > 0 || clientData.long_description) && (
                      <div className="branding-accordion-info-row">
                        {clientData.categories?.length > 0 && (
                          <div className="branding-accordion-info-tags">
                            {clientData.categories.slice(0, 3).map((cat) => (
                              <span key={cat} className="branding-accordion-info-pill">{cat}</span>
                            ))}
                          </div>
                        )}
                        {clientData.long_description && (
                          <div className="branding-accordion-info-text">
                            <div
                              className="branding-accordion-info-description"
                              dangerouslySetInnerHTML={{ __html: clientData.long_description }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* Panel cerrado posicionado encima a la izquierda */}
                <div className={`branding-accordion-closed expanded-panel`}>
                  {/* Flecha con fondo blanco cuando está expandido */}
                  <div className="branding-accordion-arrow expanded-arrow">
                    <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                      <path d="m.5 8.5 4-4-4-4" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" transform="translate(9 6)"/>
                    </svg>
                  </div>
                  <div className="branding-accordion-name">
                    <span>{clientData.name}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
});

PortfolioAccordion.displayName = "PortfolioAccordion";

export default PortfolioAccordion;

