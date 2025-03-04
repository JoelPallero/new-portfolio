import Hero from "../components/Hero";

import ToolsSlider from "../components/slides/ToolsSlider";
import VideoSection from "../components/VideoSection";
import PortfolioSection from "../components/PortfolioSection";
import PreFooter from "../components/PreFooter";


const Home = () => {
  return (
    <main>
      <Hero />
      <ToolsSlider />
      <VideoSection />
      <PortfolioSection />
      <PreFooter />
    </main>
  );
};

export default Home;
