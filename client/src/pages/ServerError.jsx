import { m } from "framer-motion";
import { Link } from "react-router-dom";
import "@as/error.css";

const ServerError = () => {
    return (
        <div className="error-page">
            <m.h1
                className="error-code"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                500
            </m.h1>

            <m.div
                className="error-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <h2 className="error-title">Error del Servidor</h2>
                <p className="error-message">
                    Algo salió mal en nuestros servidores. Estamos trabajando para arreglarlo lo antes posible.
                </p>
                <Link to="/" className="back-home-btn">
                    REINTENTAR INICIO
                </Link>
            </m.div>
        </div>
    );
};

export default ServerError;
