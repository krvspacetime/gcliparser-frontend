import { Loader } from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center gap-2">
        <Loader type="dots" color="#333" />
        <p className="animate-pulse">Checking credentials ...</p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};
