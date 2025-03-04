import Icon from "./Icons";

//styles and animations
import "@as/hero.css";
import "@as/social-icons.css";
import { motion } from "framer-motion";

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
            somos
          </motion.span>
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
            trompo
          </motion.span>
        </p>

        <p>
          <motion.span
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
            una
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
            agencia
          </motion.span>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.4,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            de
          </motion.span>
        </p>

        <p>
          <motion.span
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
            MKT
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
            DGTL
          </motion.span>
        </p>

        <p>
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
            SOCIAL
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
            MEDIA
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
            &
          </motion.span>
        </p>

        <p>
          <motion.span
            initial={{ y: 200 }}
            animate={{
              y: [200, 0, 0, 0, 0, 0, 0, -200],
            }}
            transition={{
              duration: 4,
              delay: 0.4,
              repeat: Infinity,
              repeatType: "loop",
              times: [0, 0.1, 0.875, 0.875, 0.875, 0.875, 0.875, 1],
            }}
          >
            AUDIOVISUAL
          </motion.span>
        </p>
      </div>

      {/* Íconos sociales */}
      <div className="social-icons">
        <Icon iconName="facebook" />
        <Icon iconName="instagram" />
        <Icon iconName="googleplus" />
      </div>
    </motion.div>
  );
};

export default Hero;
