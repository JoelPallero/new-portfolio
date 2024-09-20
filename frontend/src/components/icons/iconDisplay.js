import iconMap from './iconMap';

const IconDisplay = ({ iconKey, letterColor }) => {
  const IconComponent = iconMap[iconKey];

  // Verifica si el icono existe en el mapeo, y si es así, pásale el color
  return IconComponent ? IconComponent(letterColor) : iconMap['default'](letterColor);
};

export default IconDisplay;
