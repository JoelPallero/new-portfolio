import React from "react";

//styles
import '../../styles/profileImg.css'


const ProfileImg = ({className = 'profile-img'}) => {
  return (
    <img src="/profile-img.png" alt="profile photo" className={className}/>
  );
}

export default ProfileImg;