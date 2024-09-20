import BigTitles from "../titles/BigTitles";

import RecentJobSlider from '../manageJobs/sliders/RecentJobSlider'


const RecentJobs = () => {
  return (
    <>
      <BigTitles
        firstText="recent"
        secondText="projects"       
        backSpace={false}
      />
      <RecentJobSlider/>
    </>
  );
}

export default RecentJobs