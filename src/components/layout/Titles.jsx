import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Home | Gafoa",
  "/Singin": "Registrarse | Gafoa",
  "/login": "Iniciar Sesión | Gafoa",
};

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "Gafoa";
  }, [location.pathname]);

  return children;
};

export default Layout;
