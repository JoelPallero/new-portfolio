import { memo } from "react";
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

const Icons = memo(({ iconName }) => {
  const iconSrc = icons[iconName];
  if (!iconSrc) return null;

  const altTexts = {
    logo: "Logo del sitio",
    in: "Icono de LinkedIn",
    github: "Icono de GitHub",
    download: "Icono de descarga",
    down: "Flecha hacia abajo",
    close: "Cerrar",
    burguer: "Menú hamburguesa",
    wsp: "Icono de WhatsApp",
    dev: "Icono de desarrollo",
    grow: "Icono de crecimiento",
    spark: "Icono de chispa"
  };

  const altText = altTexts[iconName] || `Icono ${iconName}`;
  const isDecorative = iconName !== "down" && iconName !== "close";

  const isHighPriority = iconName === "logo" || iconName === "down";

  return (
    <img
      src={iconSrc}
      alt={altText}
      aria-hidden={isDecorative}
      width={iconName === "logo" ? "180" : (iconName === "down" ? "70" : "36")}
      height={iconName === "logo" ? "100" : (iconName === "down" ? "307" : "36")}
      style={{
        aspectRatio: iconName === "logo" ? "180 / 100" : (iconName === "down" ? "70 / 307" : "1 / 1")
      }}
      fetchpriority={isHighPriority ? "high" : "auto"}
      loading={isHighPriority ? "eager" : "lazy"}
      decoding="async"
    />
  );
});

Icons.displayName = "Icons";

export default Icons;