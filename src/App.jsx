import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const navigate = useNavigate();
  const storageToken = localStorage.getItem("nexuvaToken");

  useEffect(() => {
    if (storageToken) {
      navigate("/dashboard");
    }
  }, [storageToken]);

  return <>{!storageToken && <Login />}</>;
}

export default App;
