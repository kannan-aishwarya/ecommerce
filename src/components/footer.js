import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
      <p>&copy; 2024 My E-commerce Site. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <p>Connect with us on</p>
        <div className="footer-icons">
        <FaInstagram size={30} color="black"/>
        <FaLinkedin size={30} color="black"/>
        <FaTwitter size={30} color="black"/>
        <MdEmail size={30} color="black"/>
        </div>
      </div>    
    </footer>
  );
}
export default Footer;