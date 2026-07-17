import { memo } from "react";
import Menu from "@/components/Menu";

import Icons from "../Icons";
import { routesConfig } from "@/config/routes";

//styles and animations
import "@as/menuPopup.css";
import { m, AnimatePresence } from "framer-motion";

const MenuPopup = memo(({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          className="popup-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          initial={{
            y: -1140,
            scale: 0.25,
          }}
          animate={{
            y: 0,
            scale: 1,
          }}
          exit={{
            y: -1140,
            scale: 0.25,
          }}
          transition={{
            delay: 0.1,
            duration: 0.3,
            type: "tween",
            damping: 26,
            stiffness: 250,
          }}
        >
          <div className="medium-container popup-content">
            <m.button
              className="close-button"
              onClick={onClose}
              aria-label="Cerrar menú"
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <Icons 
                iconName="close"
              />
            </m.button>
            <Menu
              menuType="main"
              routes={routesConfig}
              classMenu="main-menu"
              onClose={onClose}
            />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
});

MenuPopup.displayName = "MenuPopup";

export default MenuPopup;
