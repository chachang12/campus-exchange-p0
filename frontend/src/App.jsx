import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext.hook';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { WelcomePage } from './pages';
import { LoginPage, RegisterPage } from './pages';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage component
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "./components/GoogleLogin";
import { UserProvider, useUser } from './context/UserContext.jsx';

function App() {
  const { user } = useAuthContext();

  return (
    <UserProvider>
      <div className="h-screen font-inter bg-[#0D0D0D]">
        
        
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/welcome" />} />
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/create" element={<CreatePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        
      </div>
    </UserProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

export default App;