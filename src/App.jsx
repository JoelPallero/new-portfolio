// App.jsx
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/fonts/index.css";
import AppRoutes from "@/routes/AppRoutes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuPopup from "@/components/popups/MenuPopup";
import useTogglePopup from '@/hooks/useTogglePopup';
import cursor from '/favicon.png';
import CustomCursor from "./components/CustomCursor";

function App() {
  const { isOpen, togglePopup } = useTogglePopup();

  return (
    <BrowserRouter basename="/trompoagencia/">
      <Header onTogglePopup={togglePopup} />
      <MenuPopup isOpen={isOpen} onClose={togglePopup} />
      <AppRoutes />
      <Footer />
      <CustomCursor icon={cursor}/>
    </BrowserRouter>
  );
}

export default App;
