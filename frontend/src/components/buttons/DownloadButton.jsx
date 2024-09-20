import React from 'react';
import IconImage from './IconImage';

//Styles

const DownloadButton = ({ text, iconKey, cvLink, className = 'menu-item'}) => {

  const icon = iconKey ? iconKey : "default";

  return (

      <a 
        href={cvLink} 
        className={className}
        download="resume-pallero.pdf">
          {icon && (
            <IconImage
            src={icon} 
              text={text}
            />
          )}
          {text}
      </a>
    
  );
};

export default DownloadButton;