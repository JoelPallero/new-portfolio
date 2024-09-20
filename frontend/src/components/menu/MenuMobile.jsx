import React from "react";

//components
import MenuItem from "./MenuItem";
import DownloadButton from "../buttons/DownloadButton";

//styles
import '../../styles/components/menuStyle/menuMobile.css';

const MenuMobile = () => {

  const resume = '/documents/resume.pdf';

  return (
    <nav className="mobile-navbar">
            <ul className="mobile-menu">
              <li className='li-mobile-menu-item'>
                <MenuItem
                  link="/"                
                  text="Home"
                  className="item-mobile-menu"
                  iconKey="home"
                />
              </li>

              <li className='li-mobile-menu-item'>
                <MenuItem
                  link="/about"                
                  text="About"
                  className="item-mobile-menu"
                  iconKey="about"
                />
              </li>

              <li className='li-mobile-menu-item'>
                <MenuItem
                  link="/portfolio"                
                  text=""
                  className="item-mobile-menu middle-menu-item"
                  iconKey="portfolio"
                />
              </li>              

              <li className='li-mobile-menu-item'>
                <MenuItem
                  link="/contact"                
                  text="Contact"
                  className="item-mobile-menu"
                  iconKey="contact"
                />
              </li>

              <li className='li-mobile-menu-item'>
                <DownloadButton
                  text="Resume"
                  cvLink={resume}
                  iconKey="download"
                  className="item-mobile-menu"
                />
              </li>
            </ul>
          </nav>
  );
}

export default MenuMobile;