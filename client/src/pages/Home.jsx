import { memo, lazy, Suspense } from "react";
import Hero from "../components/Hero";

// Lazy-loaded sub-components
const ToolsSlider = lazy(() => import("../components/slides/ToolsSlider"));
const PortfolioSection = lazy(() => import("../components/PortfolioSection"));
const PortfolioAccordion = lazy(() => import("../components/portfolio-accordion/PortfolioAccordion"));

const Home = memo(() => {
  return (
    <main>
      <Hero />
      
      <Suspense fallback={<div className="slider-placeholder" />}>
        <div className="slider-placeholder">
          <ToolsSlider />
        </div>
      </Suspense>

      {/* Portfolio mobile (hasta 1024px) */}
      <div className="portfolio-mobile-wrapper">
        <Suspense fallback={<div className="portfolio-mobile-wrapper skeleton-box" />}>
          <PortfolioSection />
        </Suspense>
      </div>

      {/* Portfolio desktop (>1024px) */}
      <section id="portfolio" className="portfolio-section portfolio-desktop-wrapper" aria-label="Sección de portafolio">
        <Suspense fallback={<div className="portfolio-desktop-wrapper skeleton-box" />}>
          <PortfolioAccordion quantity={5} />
        </Suspense>
      </section>
    </main>
  );
});

Home.displayName = "Home";

export default Home;
