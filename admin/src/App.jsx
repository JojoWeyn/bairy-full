import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/login"
          element={
            <AuthRoute>
              <AdminLogin />
            </AuthRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;