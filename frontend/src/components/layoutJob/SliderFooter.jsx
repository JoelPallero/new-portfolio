//styles
import '../../styles/components/sliders/sliderFooter.css'

const SliderFooter = ({ className = "slider-selector", onClick, src, alt }) => {
  return (
    <div className={className} onClick={onClick}>
      <img src={src} alt={`${alt} logo`} />
    </div>
  );
};

export default SliderFooter;