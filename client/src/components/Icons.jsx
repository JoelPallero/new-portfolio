import Burguer from '/assets/icons/burguer.svg';
import Linkedin from '/assets/icons/linkedin.svg';
import Whatsapp from '/assets/icons/whatsapp.svg';
import Close from '/assets/icons/close.svg';
import Github from '/assets/icons/github.svg';
import Download from '/assets/icons/download.svg';
import Spark from '/assets/icons/spark.svg';
import Grow from '/assets/icons/grow.svg';
import Down from '/assets/icons/down.png';
import Dev from '/assets/icons/dev.svg';
import Logo from '@a/logo.svg';

const icons = {
  burguer: Burguer,
  wsp: Whatsapp,
  in: Linkedin,
  close: Close,
  down: Down,
  github: Github,
  download: Download,
  dev: Dev,
  grow: Grow,
  spark: Spark,
  logo: Logo,
};

function Icons({iconName}){
  const iconSrc = icons[iconName];
  if (!iconSrc) return null;

  return (
    <>
      <img src={iconSrc} alt={iconName} title={iconName === "download" ? "Download CV" : ""} />
    </>
  );
}


export default Icons;