import { useRef, useState, useEffect, memo } from "react";
import {
  m,
  AnimatePresence,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  LayoutGroup,
} from "framer-motion";
import usePortfolioItems from "../../hooks/usePortfolioItems";
import "./portfolio-gravity-scroll.css";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const CARD_HEIGHT = 380;
const GAP = 24;
const STACK_OFFSET = 28;
const TILT_SENSITIVITY = 0.015;
const TILT_MAX = 4;

function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;
  if (path.startsWith("./assets")) return `${base}${path.substring(2)}`;
  if (!path.includes("/")) return `${base}assets/portfolioImg/${path}`;
  return `${base}${path}`;
}

const GravityCard = memo(({ item, index, velocity, onTap }) => {
  const rotateX = useTransform(velocity, (v) =>
    Math.max(-TILT_MAX, Math.min(TILT_MAX, -v * TILT_SENSITIVITY))
  );
  const rotateXSmooth = useSpring(rotateX, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  const imageUrl = getImageUrl(item.featured_image);

  const tagLabels = item.categories?.slice(0, 3) || item.tags?.slice(0, 3) || ["Web"];
  const tags = item.tags?.length ? item.tags.slice(0, 3) : [];
  const isFeatured = item.categories?.includes("featured") || item.tags?.includes("featured");

  return (
    <m.div
      layoutId={`gravity-card-${item.id}`}
      className="gravity-card gravity-card--stacked"
      style={{
        top: index * STACK_OFFSET,
        zIndex: index,
        rotateX: rotateXSmooth,
        transformPerspective: 800,
      }}
      onClick={() => onTap(item)}
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 35 },
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver proyecto ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTap(item);
        }
      }}
    >
      <div className="gravity-card-image">
        <div
          className="gravity-card-bg"
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "none" }}
          aria-hidden
        />
      </div>
      <div className="gravity-card-content">
        <div className="gravity-card-glass" />
        <div className="gravity-card-tags-row">
          {tagLabels.map((label) => (
            <span
              key={label}
              className={`gravity-card-tag ${isFeatured ? "gravity-card-tag--featured" : ""}`}
            >
              {label}
            </span>
          ))}
        </div>
        <h2 className="gravity-card-title">{item.title}</h2>
        {item.short_description && (
          <p className="gravity-card-description">{item.short_description}</p>
        )}
        {tags.length > 0 && (
          <div className="gravity-card-tags">
            {tags.map((t) => (
              <span key={t} className="gravity-card-tech-tag">{t}</span>
            ))}
          </div>
        )}
        <div className="gravity-card-footer">
          <span className="gravity-card-button">ver más</span>
        </div>
      </div>
    </m.div>
  );
});

GravityCard.displayName = "GravityCard";

const ExpandedOverlay = memo(({ item, onClose }) => {
  const imageUrl = getImageUrl(item.featured_image);

  return (
    <m.div
      layoutId={`gravity-card-${item.id}`}
      className="gravity-expanded"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        layout: { type: "spring", stiffness: 400, damping: 35 },
        opacity: { duration: 0.2 },
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Proyecto ${item.title}`}
    >
      <div
        className="gravity-expanded-bg"
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "none" }}
      />
      <div className="gravity-expanded-glass" />
      <div className="gravity-expanded-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="gravity-expanded-title">{item.title}</h2>
        {item.long_description && (
          <div
            className="gravity-expanded-description"
            dangerouslySetInnerHTML={{ __html: item.long_description }}
          />
        )}
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gravity-expanded-link"
          >
            Visitar sitio
          </a>
        )}
      </div>
      <button
        type="button"
        className="gravity-expanded-close"
        onClick={onClose}
        aria-label="Cerrar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </m.div>
  );
});

ExpandedOverlay.displayName = "ExpandedOverlay";

const PortfolioGravityScroll = memo(({ quantity = 5 }) => {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const { items, loading, error } = usePortfolioItems({
    quantity,
    category: "",
    tag: "",
  });

  useEffect(() => {
    if (selectedItem) {
      document.body.classList.add("gravity-expanded-open");
    } else {
      document.body.classList.remove("gravity-expanded-open");
    }
    return () => document.body.classList.remove("gravity-expanded-open");
  }, [selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedItem]);

  if (loading) {
    return (
      <div className="gravity-scroll-loading" role="status" aria-live="polite">
        <p>Cargando proyectos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gravity-scroll-error" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div
        ref={containerRef}
        className="gravity-scroll-container"
        style={{
          minHeight: items.length * (CARD_HEIGHT + GAP) + 200,
        }}
      >
        <div className="gravity-scroll-stack">
          {items.map((item, index) =>
            selectedItem?.id === item.id ? null : (
              <div
                key={item.id}
                className="gravity-stack-slot"
                style={{ height: CARD_HEIGHT + GAP }}
              >
                <GravityCard
                  item={item}
                  index={index}
                  velocity={velocity}
                  onTap={setSelectedItem}
                />
              </div>
            )
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedItem && (
          <ExpandedOverlay
            key="expanded"
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
});

PortfolioGravityScroll.displayName = "PortfolioGravityScroll";

export default PortfolioGravityScroll;
