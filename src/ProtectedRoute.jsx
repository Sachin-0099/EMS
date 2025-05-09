import { Navigate } from 'react-router-dom';
import { useAuth } from './context/authoContext';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // If loading is true, you can show a loader
  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};
