
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    
  }, [token]);
 
  const buttonText = isLoggedIn ? "Logout" : "Login";
  return { isLoggedIn,setIsLoggedIn,buttonText };
};