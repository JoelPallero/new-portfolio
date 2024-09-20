import React from 'react';

//components
import MenuDesktop from './MenuDesktop';

//styles
import '../../styles/components/menuStyle/menu.css';


const Menu = () => {
  return (
    <div className="menu-container">
      <MenuDesktop/>      
    </div>
  );
};

export default Menu;