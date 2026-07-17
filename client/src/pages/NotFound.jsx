import { m } from "framer-motion";
import { Link } from "react-router-dom";
import "@as/error.css";

const NotFound = () => {
    return (
        <div className="error-page">
            <m.h1
                className="error-code"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                404
            </m.h1>

            <m.div
                className="error-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="error-title">Página no encontrada</h2>
                <p className="error-message">
                    Oops! Parece que el enlace que seguiste no existe o ha sido movido a otra galaxia.
                </p>
                <Link to="/" className="back-home-btn">
                    VOLVER AL COMPRENDER
                </Link>
            </m.div>
        </div>
    );
};

export default NotFound;
