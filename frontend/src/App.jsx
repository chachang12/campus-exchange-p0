import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { WelcomePage } from './pages';
import { LoginPage, RegisterPage } from './pages';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage component
import { UserProvider, useUser } from './context/UserContext.jsx';

function App() {
  const { user } = useUser();
  const location = useLocation();

  // Define routes where the Navbar should be hidden
  const hideNavbarRoutes = ['/welcome', '/login', '/register'];

  return (
    <div className="h-screen font-inter bg-[#1A1E26]">
      {/* Conditionally render the Navbar */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/welcome" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

export default App;