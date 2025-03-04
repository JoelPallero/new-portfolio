import "./assets/styles/fonts/index.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuPopup from "@/components/popups/MenuPopup";
import useTogglePopup from '@/hooks/useTogglePopup';
import Home from "./pages/Home";

function App() {
  const { isOpen, togglePopup } = useTogglePopup();

  return (
    <>
      <Header onTogglePopup={togglePopup} />
      <MenuPopup isOpen={isOpen} onClose={togglePopup} />
      <Home/>
      <Footer />
    </>
  );
}

export default App;