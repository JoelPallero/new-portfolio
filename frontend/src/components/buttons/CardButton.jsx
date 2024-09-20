import IconImage from "./IconImage";
import ArrowRight from "../icons/ArrowRight";
import Whatsapp from "../icons/Whatsapp";
import Code from "../icons/Code";
import { Link } from 'react-router-dom';

//styles
import '../../styles/components/buttons/cardButton.css'

const CardButton = ({link, iconKey, text}) => {
  const targetBlank = iconKey == "whatsapp" ? "_blank" : ""
  return (

    <div className={`card-${iconKey}-container`}>
      <Link 
        to={link} 
        target={targetBlank} 
        className="whats-container">
          <div className="whats-icon-container">
            {iconKey === "whatsapp" ? (
              <Whatsapp
                letterColor="#ffffff"
              />
            ) :
            (
              <Code
                letterColor="#ffffff"
              />
            )}
          </div>
          <p>{text}</p>
          <div className="arrow-container">
            <ArrowRight
              color="#ffffff"
            />
          </div>
      </Link>
    </div>


  );
}

export default CardButton;