import Facebook from "/assets/toolsImg/facebook-ads.png";
import Google from "/assets/toolsImg/google-ads.png";
import Ganalytics from "/assets/toolsImg/google-a.png";
import GdataStudio from "/assets/toolsImg/google-data-studio.png";
import GsearchConsole from "/assets/toolsImg/google-search-console.png";
import Instagram from "/assets/toolsImg/instagram-ads.png";
import Linkedin from "/assets/toolsImg/linkedin-ads.png";
import Semrush from "/assets/toolsImg/semrush.png";
import Supermetrics from "/assets/toolsImg/supermetrics.png";
import Woocommerce from "/assets/toolsImg/woocommerce.png";
import Wordpress from "/assets/toolsImg/wordpress.png";
import Zapier from "/assets/toolsImg/zapier.png";

//styles and animations
import "@as/slider-tool.css";
import {motion, useScroll, useSpring} from 'framer-motion'

const marcas = {
  facebook: Facebook,
  google: Google,
  ganalytics: Ganalytics,
  gdatastudio: GdataStudio,
  gsearchconsole: GsearchConsole,
  instagram: Instagram,
  linkedin: Linkedin,
  semrush: Semrush,
  supermetrics: Supermetrics,
  woocommerce: Woocommerce,
  wordpress: Wordpress,
  zapier: Zapier,
};


const ToolsSlider = () => {
  
  return (
    <motion.section 
      className="slider-container"
      initial={{
        opacity: 0,
        scale: .5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: .5,
        type:'tween',
      }}
    >
        <div className="slider-tool">
          <div className="slider-inner">
            {[...Array(3)].map((_, index) =>
              Object.entries(marcas).map(([key, src]) => (
                <img key={`${key}-${index}`} src={src} alt={key} />
              ))
            )}
          </div>
        </div>
    </motion.section>
  );
};

export default ToolsSlider;
