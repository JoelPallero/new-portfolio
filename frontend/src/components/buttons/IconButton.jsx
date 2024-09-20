import React from 'react';

//components
import IconImg from './IconImage';

//styles
import '../../styles/iconButton.css'

//hooks
import useHoverSound from '../../hooks/useHoverSoundFX';


const IconButton = ({iconKey = null, onClick = () => {}, arialabel = null, className = "icon-button", iconClassName = "img-icon", text = null, type = "button", onMenuEnter = null}) => {
        
    const playHoverSound = onMenuEnter ? useHoverSound() : () => {};

    return(
        <button 
            onMouseEnter={playHoverSound}
            onClick={onClick}
            aria-label={arialabel}
            className={className}
            type={type}
            style={{ cursor: 'pointer' }}
            >
                <IconImg src={iconKey} alt={arialabel} className={iconClassName}/>
                {text}
        </button>
    );
}

export default IconButton;