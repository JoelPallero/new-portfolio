import React from "react";

//img de logo
import logo from '../assets/logo.png'


const Logo = ({className}) => {
  return (
    <img src={logo} alt="logo" className={className}/>
  );
}

export default Logo;