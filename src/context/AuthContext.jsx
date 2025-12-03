import { createContext, useState, useEffect } from "react";
import { getUserData } from "../services/auth/users";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userGames, setUserGames] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const userEmail = localStorage.getItem("email");
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (username)
      setUser({
        username: JSON.parse(username),
        email: JSON.parse(userEmail),
        role: JSON.parse(userRole),
        token: JSON.parse(token),
      });

    if (token) {
      loadUserData();
    }
  }, []);

  const loadUserData = async () => {
    const userData = await getUserData();

    if (!userData) return;

    setUserGames({
      myGames: userData.myGames ?? [],
      cartGames: userData.cartGames ?? [],
      favGames: userData.favGames ?? [],
      wishlistGames: userData.wishlistGames ?? [],
    });
  };

  const loginSuccess = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setUserGames(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, userGames, loginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
