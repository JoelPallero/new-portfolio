import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import productsData from '@/json/products.json';
import '@as/store.css';

const Store = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <div className="store-page page-padding">
      <div className="container">
        <m.div 
          className="store-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Tienda de Plugins</h1>
          <p>Herramientas premium diseñadas para potenciar tu ecosistema WordPress.</p>
        </m.div>

        <m.div 
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {productsData.map((product) => (
            <m.div key={product.id} className="product-card" variants={itemVariants}>
              <Link to={`/store/${product.slug}`} className="product-card-info">
                <div className="product-badge">v{product.version}</div>
                <h3>{product.name}</h3>
                <p>{product.tagline}</p>
              </Link>
              <div className="product-card-actions">
                <Link to={`/store/${product.slug}`} className="btn-secondary">
                  Detalles
                </Link>
                <a 
                  href={`/api/download.php?plugin=${product.slug}`} 
                  className="btn-primary"
                  download
                >
                  Descargar ZIP
                </a>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </div>
  );
};

export default Store;
