import useHoverBackground from "../hooks/useHoverBackground";
import PortfolioItems from "./PortfolioItems";

//styles
import "@as/portfolio-section.css";

const PortfolioSection = () => {
  const {
    backgroundImage,
    opacity,
    handleMouseEnter,
    handleMouseLeave,
  } = useHoverBackground();

  return (
    <div className="container portfolio-container" id="portfolio">

      <div className="portfolio-header">
        <h2 className="portfolio-title">Portfolio</h2>
        <p className="portfolio-excerpt">
          <br />
          I am a frontend Developer. 
          <br />
          I have a degree on software development
          <br />
          at the Intituto Tecnico Superior Cordoba.
          <br />
          Currently, I am a WordPress Developer,
          <br />
          and I am expanding my skills by
          <br />
          learning programming frameworks
          <br />
          and libraries like React.js.
          <br />
          My goal is to deepen my understanding
          <br />
          of these tools and achieve proficiency
          <br />
          in React.js and Node.js
        </p>
      </div>

      <div className="portfolio-section">
        <div
          className="bg-section"
          style={{
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
            opacity: backgroundImage ? opacity : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
        <PortfolioItems
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

    </div>
  );
};

export default PortfolioSection;