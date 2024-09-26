
//components
import BigTitles from "../titles/BigTitles";
import ExperienceSummarySection from "./ExperienceSummarySection";
import SkillSection from "./SkillSection";
import ProfileCard from "./ProfileCard";

//styles
import '../../styles/components/layoutStyle/heroContainer.css'

const HeroContainer = ({title, subtitle, parr, backSpace}) => {
  return (
    <div className="body-container">      
      <ProfileCard/>
      <div className="info-data-container">
        <div className="hero-container">
          <article className="hero-article">
            <header className="hero-header">
              <BigTitles
                firstText={title}
                secondText={subtitle}
                backSpace={backSpace}
              />
              <p className="subtitle-development">
                {parr}
              </p>
            </header>
            <div className="hero-body">
              <ExperienceSummarySection/>
            </div>
          </article>
          <SkillSection/>
        </div>
      </div>    
    </div>

  );
}


export default HeroContainer;