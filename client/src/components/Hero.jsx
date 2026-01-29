import Icons from "./Icons";

//styles and animations
import "@as/hero.css";
import "@as/social-icons.css";
import { motion } from "framer-motion";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const Hero = () => {
  return (
    <motion.div className="container hero-container">
      <div className="hero-text">
        <p>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            Joel
          </motion.span>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            Pallero
          </motion.span>
        </p>

        <p>
          <motion.span
            className="bold-title"
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.1,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            Frontend
          </motion.span>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.25,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            dev
          </motion.span>
        </p>

        <p>
          <motion.span
            className="bold-title"
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.2,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            Wordpress
          </motion.span>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            dev
          </motion.span>
        </p>

        <p>
          <motion.span
            className="bold-title"
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            +3
          </motion.span>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            years
          </motion.span>
        </p>
      </div>

      {/* Íconos sociales */}
      <div className="social-icons">
        <a target="_blank" href="https://www.linkedin.com/in/joel-pallero/">
          <Icons iconName="in"/>
        </a>
        <a target="_blank" href="https://github.com/JoelPallero?tab=repositories">
          <Icons iconName="github"/>
        </a>
        <a target="_blank" href={`${base}docs/Joel-Pallero-Resume.pdf`} download="resume-joel-pallero.pdf">
          <Icons iconName="download"/>
        </a>
        {/* <a target="_blank" href="https://wa.me/543512149461">
          <Icons iconName="wsp"/>
        </a> */}
      </div>

      {/* arrow to go down */}
      <a href="#slider-dev" className="arrow">        
        <Icons iconName="down"/>
      </a>
    </motion.div>
  );
};

export default Hero;
