import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>

      <Link to="login">Login</Link>
    </div>
  );
}

export default Navbar;
