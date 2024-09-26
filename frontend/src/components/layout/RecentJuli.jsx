//components
import BigTitles from "../titles/BigTitles";
import RecentJobSliderJuli from '../layoutJob/RecentJobSliderJuli';

//styles
import '../../styles/components/layoutStyle/recentJobs.css'

const RecentJuli = () => {
  return (
    <>
      <div className="recent-job-layout">
        <BigTitles
          firstText="JyJ "
          secondText="projects"       
          backSpace={false}
        />
        <RecentJobSliderJuli
          quantity={4}
          order="asc"
        />
      </div>
    </>
  );
}

export default RecentJuli