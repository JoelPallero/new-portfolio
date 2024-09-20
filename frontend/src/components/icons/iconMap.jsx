import ArrowRight from './ArrowRight';
import Code from './Code';
import Linkedin from './Linkedin';
import Mail from './Mail';
import Portfolio from './Portfolio';
import Whatsapp from './Whatsapp';
import Download from './Download';

const iconMap = {
  arrowRight: (color) => <ArrowRight letterColor={color} />,
  code: (color) => <Code letterColor={color} />,
  linkedin: (color) => <Linkedin letterColor={color} />,
  mail: (color) => <Mail letterColor={color} />,
  portfolio: (color) => <Portfolio letterColor={color} />,
  whatsapp: (color) => <Whatsapp letterColor={color} />,
  download: (color) => <Download letterColor={color} />,
  default: (color) => <div style={{ color }}>No Icon</div>
};

export default iconMap;
