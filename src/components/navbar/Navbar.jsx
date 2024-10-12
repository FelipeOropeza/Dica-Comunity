import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserMenu from "../usermenu/usermenu";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 shadow-md p-4">
      <ul className="flex justify-between items-center">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <div className="flex items-center">
          {user ? (
            <UserMenu user={user} logout={logout} />
          ) : (
            <li>
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
