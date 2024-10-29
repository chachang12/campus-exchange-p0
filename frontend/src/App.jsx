import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { WelcomePage, MessagesPage, ProductPage } from './pages';
import { LoginPage, RegisterPage } from './pages';
import ProfilePage from './pages/ProfilePage'; // Import the ProfilePage component
import { useUser } from './context/UserContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';

function App() {
  const { user, loading } = useUser();
  const location = useLocation();

  // Define routes where the Navbar should be hidden
  const hideNavbarRoutes = ['/welcome', '/login', '/register'];

  if (loading) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <ChatContextProvider user={user}>
      <div className="h-screen font-inter bg-[#1A1E26]">
        {/* Conditionally render the Navbar */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/welcome" />} />
          <Route path="home" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/messages" element={user ? <MessagesPage /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={<ProductPage />} /> 
        </Routes>
      </div>
    </ChatContextProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

export default App;