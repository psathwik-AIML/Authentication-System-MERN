import React from "react";
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
function SocialButtons() {
  return (
    <div className="social-buttons">
      <button className="google">
        <FaGoogle />
        Google Login
      </button>
      <button className="github">
        <FaGithub />
        Github Login
      </button>
      <button className="facebook">
        <FaFacebook />
        Facebook Login
      </button>
      <button className="linkedin">
        <FaLinkedin />
        Linkedin Login
      </button>
    </div>
  );
}

export default SocialButtons;
