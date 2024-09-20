import React from "react";

//icon componets
import IconProfileButton from "../buttons/IconProfileButton";

//styles
import '../../styles/components/iconsStyle/icons.css';

const SocialContact = () => {
  
  const resume = '/documents/resume.pdf';

  return (
    <section className="social-contact-icons">
      <IconProfileButton
        href="https://wa.me/543512149461"
        target="_blank"
        iconKey="whatsapp"
        letterColor="var(--orange)"
      />
      <IconProfileButton
        href="mailto:esteban.pallero@gmail.com"
        target="_blank"
        iconKey="mail"
        letterColor="var(--orange)"
      />
      <IconProfileButton
        href="https://www.linkedin.com/in/joel-pallero/"
        target="_blank"
        iconKey="linkedin"
        letterColor="var(--orange)"
      />
      <IconProfileButton
        href={resume}
        target="_blank"
        iconKey="download"
        letterColor="var(--orange)"
        download="resume-pallero.pdf"
      />
    </section>
  );
}


export default SocialContact;