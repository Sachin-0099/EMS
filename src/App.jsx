import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authoContext';
import { ProtectedRoute } from './ProtectedRoute';

import PublicLayout from './PublicLayout';


import Login from './pages/Login';
import Register from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Layout from './Layout';


function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public pages inside PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected pages inside MainLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
            <Layout/>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
         
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
