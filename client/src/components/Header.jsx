import { memo } from "react";
import Icons from './Icons';
import { useLocation } from "react-router-dom";

//styles & animations
import '@as/header.css'
import { m } from "framer-motion";

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const Header = memo(({onTogglePopup}) => {
  const location = useLocation();
  const isStoreRoot = location.pathname === "/store";

  return (
    <header className="header">
      <div className="container header-container">
        <m.a
          className="logo-img"
          href={`${base}`}
          aria-label="Ir al inicio"
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
        </m.a>
        
        {!isStoreRoot && (
          <div className="header-nav">
            <m.a
              className="nav-link"
              href={`/store`}
              initial={{
                y: -250,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.1,
                type: "spring",
                damping: 20,
                stiffness: 350,
              }}
            >
              Tienda
            </m.a>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;