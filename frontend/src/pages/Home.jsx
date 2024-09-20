import React from "react";

//components
import HeroContainer from "../components/layout/HeroContainer";
import RecentJobs from "../components/layout/RecentJobs";


const Home  = () => {
  return (

    <>

    <HeroContainer      
      title="frontend"
      subtitle="developer"
      parr="I transform ideas into engaging digital experiences. With a keen eye for design and a passion for creating intuitive interfaces, I bring websites to life using modern technologies. "
      backSpace={true}
    />

    <RecentJobs/>
    
    </>

  );
}

export default Home;

//El boton de contacto, debe viajar, a la posicion de scrolltop button y convertirse en un boton de whatsapp
// Pero se debe notar un poquito la trasformacion mas o menos en .5s quiza este bien
