import { memo } from "react";
import PortfolioGravityScroll from "./portfolio-gravity-scroll/PortfolioGravityScroll";

//styles
import "@as/portfolio-section.css";

const PortfolioSection = memo(() => {
  return (
    <div className="container portfolio-container" id="portfolio">
      <div className="portfolio-header">
        <h2 className="portfolio-title">Portfolio</h2>
      </div>

      <div className="portfolio-section portfolio-section-mobile">
        <PortfolioGravityScroll quantity={6} />
      </div>
    </div>
  );
});

PortfolioSection.displayName = "PortfolioSection";

export default PortfolioSection;