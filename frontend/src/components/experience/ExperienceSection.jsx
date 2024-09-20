//styles
import '../../styles/components/experience/experienceSection.css'

const ExperienceSection = ({title = "No hay texto", subtitle = "no hay texto"}) => {
  return (
    <>
      <div className="experience-container">
        <div className="title-experience">{title}</div>
        <div className="subtitle-experience">{subtitle}</div>
      </div>
    </>
  );
}


export default ExperienceSection