import BigTitles from "../titles/BigTitles";
import ExperienceSummarySection from "./ExperienceSummarySection";
import CardSection from "./CardSection";


//styles
import '../../styles/components/layoutStyle/heroContainer.css'
import ProfileCard from "./ProfileCard";

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
          <CardSection/>
        </div>
      </div>    
    </div>

  );
}


export default HeroContainer;