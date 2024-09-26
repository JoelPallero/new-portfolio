
import Css from "../icons/css";
import Html from "../icons/html";
import Javascript from "../icons/javascript";
import ReactIcon from "../icons/ReactIcon";
import Php from "../icons/php";
import Wordpress from '../icons/Wordpress'
import Woocommerce from "../icons/woocommerce";
import Figma from '../icons/Figma';
import GitHub from '../icons/Github';
import Elementor from '../icons/Elementor';
import Masterstudy from "../icons/masterstudy";

//styles
import '../../styles/components/layoutStyle/skillSection.css'

const SkillSection = () => {

  const gitHubWeb = "https://github.com/JoelPallero?tab=repositories"

  function clickGithub(){
    window.open(gitHubWeb);
  }

  return (
    <div className="skill-section">
      <header className="skill-header">
        <h3>Skills</h3>
      </header>
      <footer className="skill-footer">
        <Html color="#dddddd"/>
        <Css color="#dddddd"/>
        <Javascript color="#dddddd"/>
        <ReactIcon color="#dddddd"/>
        <GitHub color="#dddddd" onClick={clickGithub}/>
        <Php color="#dddddd"/>
        <Wordpress color="#dddddd"/>
        <Elementor color="#dddddd"/>
        <Woocommerce color="#dddddd"/>
        <Figma color="#dddddd"/>
      </footer>
    </div>
  );
}

export default SkillSection;