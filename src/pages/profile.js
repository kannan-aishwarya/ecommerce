import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./profile.css";
function Profile() {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const handleLogOut = async () => {
        try{
            await auth.signOut();
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error); 
        }
    }
      return (
        <div className="profile-container">
        <div className="profile-card">
            <h1>Profile</h1>
                {user ? (
                    <>
                    <p className="profile-email">Email: {user.email}</p>
                    <button onClick={handleLogOut} className="logout-btn">Logout</button>
                    </>
                 ) : (
            <p>No user logged in</p>
           )}
    </div>
    </div>
  );
}
export default Profile;