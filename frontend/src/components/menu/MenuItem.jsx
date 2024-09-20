import React from 'react';
import { Link } from 'react-router-dom';
import IconImage from '../buttons/IconImage';

const MenuItem = ({ link, text, alt, className = 'menu-item', iconKey}) => {

  const icon = iconKey ? iconKey : "";

  return (
      <Link 
        to={link} 
        className={className}>
          {icon && (
            <IconImage
              src={icon} 
              text={text}
            />
          )}
          {text}
          <div className="title-box">
            {`${icon}`}
          </div>
      </Link>    
  );
};

export default MenuItem;