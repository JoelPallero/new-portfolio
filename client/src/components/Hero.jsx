import Icons from "./Icons";
import { memo } from "react";

//styles and animations
import "@as/hero.css";
import "@as/social-icons.css";
import { m } from "framer-motion";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

// Componente reutilizable para texto animado
const AnimatedText = memo(({ children, delay = 0, className = "" }) => {
  const animationConfig = {
    initial: { y: 0 },
    animate: {
      y: [200, 0, 0, 0, 0, 0, 0, -200],
    },
    transition: {
      duration: 4,
      delay,
      repeat: Infinity,
      repeatType: "loop",
      times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
    },
  };

  return (
    <m.span className={className} {...animationConfig}>
      {children}
    </m.span>
  );
});

AnimatedText.displayName = "AnimatedText";

const Hero = () => {
  return (
    <m.div className="container hero-container">
      <div className="hero-text">
        <p>
          <AnimatedText>Joel</AnimatedText>
          <AnimatedText delay={0.3}>Pallero</AnimatedText>
        </p>

        <p>
          <AnimatedText delay={0.1} className="bold-title">Frontend</AnimatedText>
          <AnimatedText delay={0.25}>dev</AnimatedText>
        </p>

        <p>
          <AnimatedText delay={0.2} className="bold-title">Wordpress</AnimatedText>
          <AnimatedText delay={0.5}>dev</AnimatedText>
        </p>

        <p>
          <AnimatedText delay={0.3} className="bold-title">+4</AnimatedText>
          <AnimatedText delay={0.3}>years</AnimatedText>
        </p>
      </div>

      {/* Íconos sociales */}
      <div className="social-icons">
        <a 
          target="_blank" 
          href="https://www.linkedin.com/in/joel-pallero/" 
          rel="noopener noreferrer"
          aria-label="Visitar perfil de LinkedIn"
        >
          <Icons iconName="in"/>
        </a>
        <a 
          target="_blank" 
          href="https://github.com/JoelPallero?tab=repositories" 
          rel="noopener noreferrer"
          aria-label="Visitar perfil de GitHub"
        >
          <Icons iconName="github"/>
        </a>
        <a 
          target="_blank" 
          href={`${base}docs/Joel-Pallero-Resume.pdf`} 
          download="resume-joel-pallero.pdf"
          rel="noopener noreferrer"
          aria-label="Descargar currículum vitae"
        >
          <Icons iconName="download"/>
        </a>
        {/* <a target="_blank" href="https://wa.me/543512149461">
          <Icons iconName="wsp"/>
        </a> */}
      </div>

      {/* arrow to go down */}
      <a 
        href="#slider-dev" 
        className="arrow"
        aria-label="Ir a la sección de herramientas de desarrollo"
      >        
        <Icons iconName="down"/>
      </a>
    </m.div>
  );
};

export default Hero;
