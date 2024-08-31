import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            {" "}
            <Link to="/">Home</Link>{" "}
          </li>
          <div className="right">
            <li>
              <Link to="login">Login</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
