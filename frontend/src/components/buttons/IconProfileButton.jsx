import IconDisplay from '../icons/IconDisplay';

//styles
import '../../styles/components/buttons/iconProfileButton.css'

const IconProfileButton = ({ href, target, className = 'icon-container', iconKey, letterColor = "#ffffff", download }) => {

  const text = download ? "resume" : iconKey;

  return (
    <a 
      href={href}
      target={target}
      className={className}
      {...(download ? download={download} : {})}
    >
      <IconDisplay iconKey={iconKey} letterColor={letterColor} />
      <div className="title-icon-bubble">
        {text}
      </div>
    </a>
  );
}

export default IconProfileButton;
