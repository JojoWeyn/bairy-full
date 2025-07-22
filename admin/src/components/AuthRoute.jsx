import { Navigate } from 'react-router-dom';

export default function AuthRoute({ children }) {
  const token = localStorage.getItem('adminToken');
  return token ? <Navigate to="/admin" replace /> : children;
}