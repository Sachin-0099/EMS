import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          // Simulate a delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          // You can add more logic to simulate token expiration or check
          const mockUser = {
            name: 'Test User',
            email: 'test@ems.com',
          };
          setUser(mockUser);
        }
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    // Simulate a login API with dummy user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@ems.com' && password === 'password123') {
          const mockToken = 'mocked-jwt-token';
          const mockUser = { name: 'Test User', email };

          localStorage.setItem('token', mockToken);
          setToken(mockToken);
          setUser(mockUser);
          navigate('/dashboard');
          resolve();
        } else {
          reject('Invalid email or password');
        }
      }, 500);
    });
  };

  const register = async (name, email, password) => {
    // Simulate a register API
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockToken = 'mocked-jwt-token';
        const mockUser = { name, email };

        localStorage.setItem('token', mockToken);
        setToken(mockToken);
        setUser(mockUser);
        navigate('/dashboard');
        resolve();
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
