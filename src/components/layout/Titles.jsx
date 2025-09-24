import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "smartOrder",
  "/menu": "Menú | smartOrder",
  "/order": "Pedidos | smartOrder",
  "/login": "Iniciar Sesión | smartOrder",
  "/cart": "Carrito | smartOrder",
};

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    document.title = titles[location.pathname] || "smartOrder";
  }, [location.pathname]);

  return children;
};

export default Layout;
