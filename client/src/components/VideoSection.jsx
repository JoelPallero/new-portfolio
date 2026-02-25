//styles and animations
import '@as/video-section.css';

const VideoSection = () => {
  // TODO: Definir la ruta del video o importarlo
  const video = "";

  return (    
    <video
      className="video-background"
      src={video}
      autoPlay
      muted
      loop
      playsInline
      aria-label="Video de fondo"
    />
  );
};

export default VideoSection;
