//styles and animations
import '@as/video-section.css';



const VideoSection = () => {

  return (    
    <video
      className="video-background"
      src={video}
      autoPlay
      muted
      loop
      playsInline
    />
  );
};

export default VideoSection;
