import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
