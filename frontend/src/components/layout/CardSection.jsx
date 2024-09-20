import CardButton from "../buttons/CardButton";

const CardSection = () => {
  return (
    <div className="card-section">
      <CardButton
        link="https://wa.me/543512149461"
        iconKey="whatsapp"
        text="Let's work together"
      />
      <CardButton
        link="/portfolio"
        iconKey="code"
        text="Check my Portfolio"
      />
    </div>
  );
}

export default CardSection;