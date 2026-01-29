import { useState } from "react";

import Icons from './Icons';

//styles & animations
import '@as/header.css'
import { motion } from "framer-motion";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const Header = ({onTogglePopup}) => {
  const [showPopuup, setShowPopup] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <motion.a
          className="logo-img"
          href={`${base}`}
          initial={{
            y: -250,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 350,
          }}
        >
          <Icons iconName="logo"/>
        </motion.a>
        {/* <motion.button
          className="nav-button"
          initial={{
            y: -250,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
            type: "spring",
            damping: 28,
            stiffness: 350,
          }}
          onClick={onTogglePopup}
        >
          <a target="_blank" href="https://wa.me/543512149461">
            <Icons iconName="wsp2"/>
          </a>
        </motion.button>     */}
      </div>
    </header>
  );
};

export default Header;