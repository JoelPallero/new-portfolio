import "../../styles/scrollMotion/scrollMotion.css";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

//components
import Css from "../icons/css";
import Html from "../icons/html";
import Javascript from "../icons/javascript";
import ReactIcon from "../icons/ReactIcon";
import Php from "../icons/php";
import Masterstudy from "../icons/masterstudy";
import Wordpress from '../icons/Wordpress'
import Woocommerce from "../icons/woocommerce";
import Figma from '../icons/Figma'


// Se elimina la declaración de la interfaz y se sustituye con destructuring en los props
function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Calcula la posición transformada del scroll
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  // No se necesita tipar useRef
  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Cambia la dirección del movimiento en función del scroll
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // Renderiza el contenido en bucle para el efecto de parallax
  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

function ScrollMotion() {
  return (
    <section className="scroll-container">
      <ParallaxText baseVelocity={-1}>
        frontend
        <Html/>
        developer
        <Css/>
        design
        <Figma/>
        react
        <ReactIcon/>
        javascript
        <Javascript/>
        website
        <Wordpress/>
        e-commerce
        <Woocommerce/>
        lms
        <Masterstudy/>
      </ParallaxText>
      <ParallaxText baseVelocity={1}>
        frontend
        <Html/>
        developer
        <Css/>
        design
        <Figma/>
        react
        <ReactIcon/>
        javascript
        <Javascript/>
        website
        <Wordpress/>
        e-commerce
        <Woocommerce/>
        lms
        <Masterstudy/>
      </ParallaxText>
    </section>
  );
}

export default ScrollMotion;