import React from "react";

//iconMap
import iconMap from '../../assets/icons/iconMap';

const IconImage = ({src, text, className = 'footer-menu-icon-button'}) => {

  const icon = iconMap[src] ? iconMap[src] : src;

  return (

    <img src={icon} alt={text} className={className}/>

  );
}


export default IconImage;