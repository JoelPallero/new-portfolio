import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import productsData from '@/json/products.json';
import '@as/store.css';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = productsData.find((p) => p.slug === slug);
    if (!foundProduct) {
      navigate('/store');
    } else {
      setProduct(foundProduct);
    }
  }, [slug, navigate]);

  if (!product) return null;

  return (
    <div className="product-detail-page page-padding">
      <div className="container">
        <m.div 
          className="breadcrumb"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/store">← Volver a la Tienda</Link>
        </m.div>

        <section className="product-hero">
          <m.div 
            className="product-info-main"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="version-tag">v{product.version}</div>
            <h1>{product.name}</h1>
            <p className="tagline">{product.tagline}</p>
            <p className="description">{product.description}</p>
            
            <div className="hero-actions">
              <a 
                href={`/api/download.php?plugin=${product.slug}`} 
                className="btn-primary-large"
                download
              >
                Descargar Gratis (ZIP)
              </a>
            </div>
          </m.div>

          {/* Screenshot placeholder - The user mentioned adding captures */}
          <m.div 
            className="product-screenshot-container"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="screenshot-placeholder">
              <span>Vista previa del panel administrativo</span>
              {/* Future: Image component would go here */}
            </div>
          </m.div>
        </section>

        <section className="product-sections">
          <div className="benefits-section card-dark">
            <h2>Características Principales</h2>
            <ul>
              {product.benefits?.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
              {product.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          {product.specs && (
            <div className="specs-section card-dark">
              <h2>Ficha Técnica</h2>
              <div className="specs-grid">
                {Object.entries(product.specs).map(([specName, specVal], i) => (
                  <div key={i} className="spec-item">
                    <span className="spec-label">{specName}:</span>
                    <span className="spec-value">{specVal}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.plans && (
            <div className="plans-section card-dark">
              <h2>Planes</h2>
              <div className="plans-grid">
                {Object.entries(product.plans).map(([planName, planDesc], i) => (
                  <div key={i} className="plan-item">
                    <h4>{planName}</h4>
                    <p>{planDesc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.faqs && (
            <div className="faqs-section card-dark">
              <h2>Preguntas Frecuentes</h2>
              <div className="faqs-grid">
                {product.faqs.map((faq, i) => (
                  <div key={i} className="faq-item">
                    <h5>{faq.q}</h5>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
