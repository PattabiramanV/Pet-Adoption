import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faTwitter,
  faGithub,
 
} from "@fortawesome/free-brands-svg-icons";

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        {/* <div className="footer-main"> */}
      <div className="footer-container">
        <div className="footer-column">
          <h3>How Can We Help?</h3>
          <ul>
            <li><a href="#">Adopt a pet</a></li>
            <li><a href="#">Rehome a pet</a></li>
            <li><a href="#">Adopt FAQ's</a></li>
            <li><a href="#">Rehome FAQ's</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt"></i> 123 Main Street, Anytown, USA</li>
            <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
            <li><i className="fas fa-envelope"></i> FurryFriendsSupport@gmail.com</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Keep In Touch With Us</h3>
          <p>Join the FurryFriends magazine and be first to hear about news</p>
          <div className="subscribe-form">
            <input type="email" placeholder="E-mail Address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">

        <div className="div_sub_footer">
        <p>&copy;Furry Friends</p>
        <div className="social-icons">
          <a href="#"><FontAwesomeIcon icon={faInstagram}/></a>
          <a href="#"><FontAwesomeIcon icon={faGithub}/></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedin}/></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter}/></a>
          <a href="#"> <FontAwesomeIcon icon={faGithub}/></a>
        </div>
        </div>

      </div>
      {/* </div> */}
    </footer>
  );
};

export default Footer;
