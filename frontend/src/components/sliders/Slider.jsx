//styles
import '../../styles/components/sliders/slider.css'

//icons
import ArrowRight from '../icons/ArrowRight'

//motions
import {motion} from 'framer-motion';


const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0,
    transition: .2
  }
};

const slideText = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }

};

const Slider = ({ jobName, workDone, siteLink = "false", siteCapture }) => {
  return (
    <motion.div className="slider"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}>

      <motion.div 
        className="left-container"        
        variants={container} 
        initial="hidden"
        animate="visible" 
      >
          <motion.div className="data-job-slider" variants={slideText}>
            <h3>Name</h3>
            <p>{jobName}</p>
          </motion.div>
          <motion.div className="data-job-slider" variants={slideText}>
            <h3>Wordk Done</h3>
            <p>{workDone}</p>
          </motion.div>
          {
            siteLink !== "false" &&
            (<motion.div className="data-job-slider" variants={slideText}>
              <a href={siteLink} className='website-button-slider' target="_blank" rel="noopener noreferrer">visit website</a>
            </motion.div>)
          }
      </motion.div>
      <motion.div className="right-container" 
        style={{
          backgroundImage: `url(${siteCapture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
          width: '100%',
          transition: 'all .3s ease-in-out'
        }}
      >
        <motion.h3 
          variants={container} 
          initial="hidden"
          animate="visible" >
            {jobName}
            <ArrowRight
              color="#ffffff"
            />
        </motion.h3>
        
      </motion.div>
    </motion.div>
  );
}



export default Slider;
