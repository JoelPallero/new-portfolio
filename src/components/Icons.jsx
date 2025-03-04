import Burguer from '/assets/icons/burguer.svg';
import Facebook from '/assets/icons/facebook.svg';
import Instagram from '/assets/icons/instagram.svg';
import GooglePlus from '/assets/icons/googleplus.svg';
import Close from '/assets/icons/close.svg';
import Logo from '@a/logo.png';

const icons = {
  burguer: Burguer,
  facebook: Facebook,
  instagram: Instagram,
  googleplus: GooglePlus,
  close: Close,
  logo: Logo,
};

function Icons({iconName}){
  const iconSrc = icons[iconName];
  if (!iconSrc) return null;

  return (
    <>
      <img src={iconSrc} alt={iconName} />
    </>
  );
}


export default Icons;