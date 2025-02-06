import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response =
        import.meta.env.VITE_NODE_ENV === "production"
          ? await fetch(`${import.meta.env.VITE_API_URL}/auth`)
          : await fetch(
              `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/auth`,
            );

      if (!response.ok) {
        throw new Error(
          `Network response was not ok. Error: ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("user", data.status);
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
