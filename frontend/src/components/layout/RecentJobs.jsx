//components
import BigTitles from "../titles/BigTitles";
import RecentJobSlider from '../layoutJob/RecentJobSlider';

//styles
import '../../styles/components/layoutStyle/recentJobs.css'

const RecentJobs = () => {
  return (
    <>
      <div className="recent-job-layout">
        <BigTitles
          firstText="recent"
          secondText="projects"       
          backSpace={false}
        />
        <RecentJobSlider
          quantity={4}
          order="asc"
        />
      </div>
    </>
  );
}

export default RecentJobs