import React from "react";
import "@as/slider-tool.css";
import { motion } from "framer-motion";
import Icons from "../Icons";

const dev = {
  html: "HTML",
  css: "CSS",
  php: "PHP",
  javascript: "Javascript",
  react: "React.js",
  github: "Github",
  frontend: "Frontend",
  wordpress: "Wordpress",
  design: "Figma",
  html2: "HTML",
  css2: "CSS",
  php2: "PHP",
  javascript2: "Javascript",
  react2: "React.js",
  github2: "Github",
  frontend2: "Frontend",
  wordpress2: "Wordpress",  
  design2: "Figma",
  html3: "HTML",
  css3: "CSS",
  php3: "PHP",
  javascript3: "Javascript",
  react3: "React.js",
  github3: "Github",
  frontend3: "Frontend",
  wordpress3: "Wordpress",  
  design3: "Figma",
};

const mkt = {
  seo: "SEO",
  analitica: "Google Analytics",
  seo2: "SEO",
  analitica2: "Google Analytics",
  seo3: "SEO",
  analitica3: "Google Analytics",
  seo4: "SEO",
  analitica4: "Google Analytics",
  seo5: "SEO",
  analitica5: "Google Analytics",
  seo6: "SEO",
  analitica6: "Google Analytics",
  seo7: "SEO",
  analitica7: "Google Analytics",
};

const ToolsSlider = ({ place = "dev" }) => {
  const items = place === "mkt" ? mkt : dev;

  return (
    <motion.section
      className="slider-container"
      id={place === "dev" ? "slider-dev" : "slider-mkt"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <div className="slider-tool">
        <div className="slider-inner">
          {[...Array(10)].map((_, index) =>
            Object.entries(items).map(([key, text]) => (
              <React.Fragment key={`${key}-${index}`}>
                <span className="slider-item">
                  {text}
                </span>
                {items === dev ? (<Icons iconName="dev"/>) : (<Icons iconName="grow"/>)}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ToolsSlider;