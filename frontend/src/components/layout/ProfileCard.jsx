import React from "react";

//components
import ProfileImg from "../logosite/ProfileImg";
import SocialContact from '../socialContact/SocialContact';

//styles
import '../../styles/components/layoutStyle/profileCard.css';

const ProfileCard = () => {
  return (
    <section className="profile-container">
      <div className="header-profile">
        <ProfileImg/>
        <h3 className="profile-header-title">Joel Pallero</h3>
      </div>
      <footer className="footer-profile">
        <div className="footer-excert">
          <p className="">
            A FrontEnd Developer who has gained experience through +15 satisfied clients
          </p>
        </div>
        <div className="footer-social-contact">
          <SocialContact/>
        </div>
      </footer>
    </section>
  );
}

export default ProfileCard;