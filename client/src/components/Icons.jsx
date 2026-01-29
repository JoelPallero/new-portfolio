import Logo from '@a/logo.svg';

const base = import.meta.env.BASE_URL?.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const icons = {
  burguer: `${base}assets/icons/burguer.svg`,
  wsp: `${base}assets/icons/whatsapp.svg`,
  in: `${base}assets/icons/linkedin.svg`,
  close: `${base}assets/icons/close.svg`,
  down: `${base}assets/icons/down.png`,
  github: `${base}assets/icons/github.svg`,
  download: `${base}assets/icons/download.svg`,
  dev: `${base}assets/icons/dev.svg`,
  grow: `${base}assets/icons/grow.svg`,
  spark: `${base}assets/icons/spark.svg`,
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