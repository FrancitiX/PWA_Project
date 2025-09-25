import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home",
  "/Singin": "Registrarse",
  "/login": "Iniciar Sesión",
};

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "smartOrder";
  }, [location.pathname]);

  return children;
};

export default Layout;
