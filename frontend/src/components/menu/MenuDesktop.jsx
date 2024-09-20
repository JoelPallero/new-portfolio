import React from "react";

//components
import MenuItem from './MenuItem';


import '../../styles/components/menuStyle/menuDesktop.css'

const MenuDesktop = () => {
  return (
          <nav className="navbar">
            <div className="menu-container">              
              <ul className="menu">
                
                <li className='li-menu-item'>
                  <MenuItem
                    link="/"
                    text=""
                    iconKey="home"
                  />
                </li>

                <li className='li-menu-item'>
                  <MenuItem
                    link="/portfolio"
                    text=""
                    iconKey="portfolio"
                  />
                </li>

                <li className='li-menu-item'>
                  <MenuItem
                    link="/about"
                    text=""
                    iconKey="about"
                  />
                </li>

                <li className='li-menu-item'>
                  <MenuItem
                    link="/contact"
                    text=""
                    iconKey="contact"
                  />
                </li>
              </ul>

            </div>

            {/* <div className="login-button">
                <MenuItem
                  link="/login"                
                  text="Login"
                  className="login-button-item"
                  iconKey="login"
                />
            </div> */}
          </nav>
  );
}

export default MenuDesktop;