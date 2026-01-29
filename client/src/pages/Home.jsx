import Hero from "../components/Hero";
import ToolsSlider from "../components/slides/ToolsSlider";
import VideoSection from "../components/VideoSection";
import PortfolioSection from "../components/PortfolioSection";
import PortfolioAccordion from "../components/portfolio-accordion/PortfolioAccordion";
import PreFooter from "../components/PreFooter";


const Home = () => {
  return (
    <main>
      <Hero />
      <ToolsSlider/>
      {/* Portfolio anterior para mobile (hasta 1024px) */}
      <div className="portfolio-mobile">
        <PortfolioSection />
      </div>
      {/* Portfolio nuevo para desktop (>1024px) */}
      <section id="portfolio" className="portfolio-section portfolio-desktop">
        <PortfolioAccordion quantity={5} />
      </section>
      <ToolsSlider
        place="mkt"
      />
    </main>
  );
};

export default Home;
