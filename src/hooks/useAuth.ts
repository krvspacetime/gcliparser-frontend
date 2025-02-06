import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth");
      if (!response.ok) throw new Error("Error checking auth");

      const data: { status: string | null } = await response.json();
      console.log(data);
      if (data && data.status === "success") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      setIsAuthenticated(false);
      console.error(e);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return { isAuthenticated };
};
