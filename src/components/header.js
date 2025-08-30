import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";  
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
        <div className="header-left">
            <FaHome size={30} color="black" onClick={() => navigate("/home")}/>
        </div>
        <div className="header-right">
            <FaSearch size={30} color="black"/>
            <FaCartPlus size={30} color="black"/>
            <FaUser size={30} color="black" onClick={() => navigate("/profile")}/>
        </div>
        
    </header>
  );
}
export default Header;