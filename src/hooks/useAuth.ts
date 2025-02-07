import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth");
      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Error: ${response.statusText}`,
        );
      }

      const data = await response.json();
      setUser(data.status);
      setIsAuthenticated(!!data.status);
    } catch (error) {
      console.error("Error fetching authentication status:", error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return { user, setUser, loading, isAuthenticated };
};
