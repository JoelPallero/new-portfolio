import "./assets/styles/fonts/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useTogglePopup from '@/hooks/useTogglePopup';

import { useEffect, lazy, Suspense } from "react";
import { logVisitorInfo } from "./utils/visitorLogger";

import { Routes, Route } from "react-router-dom";
import { LazyMotion, domMax } from "framer-motion";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Store = lazy(() => import("./pages/Store"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServerError = lazy(() => import("./pages/ServerError"));
const MenuPopup = lazy(() => import("@/components/popups/MenuPopup"));

function App() {
  const { isOpen, togglePopup } = useTogglePopup();

  useEffect(() => {
    // Priority: Render first, then log visitor info using idle time or delay
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => logVisitorInfo());
    } else {
      setTimeout(() => logVisitorInfo(), 5000);
    }
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <Header onTogglePopup={togglePopup} />
      <Suspense fallback={<div className="home-placeholder-full" />}>
        <MenuPopup isOpen={isOpen} onClose={togglePopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:slug" element={<ProductDetail />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </LazyMotion>
  );
}

export default App;