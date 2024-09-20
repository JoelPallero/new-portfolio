import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

//components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RoutesConfig from './routes/RoutesConfig';

function App() {
  return (
    
    <>
      <Header/>

      <main className="main">        
        <RoutesConfig/>
      </main>

      <Footer/>
    </>
  );
}

export default App;