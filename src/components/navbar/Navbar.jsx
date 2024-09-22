import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
// import Cookies from "js-cookie";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  // const token = Cookies.get('token');

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            {" "}
            <Link to="/">Home</Link>{" "}
          </li>
          <div className="right">
            {user ? (
              <>
                <li><Link to="perfil">{user}</Link></li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="login">Login</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
